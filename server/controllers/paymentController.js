import { Order } from "../models/orderModel.js";
import { Class } from "../models/classModel.js";
import Stripe from "stripe";

// config stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// create checkout session
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { classId } = req.body;

    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ err: "Class not found." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: classDetails.title },
            unit_amount: Math.round(classDetails.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CORS}/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CORS}/user/payment-cancel`,
    });

    const order = new Order({
      studentId: req.user.id,
      sessionId: session.id,
      classId: classDetails._id,
      price: classDetails.price,
      paymentStatus: "pending",
    });

    await order.save();

    // send email to student
    await sendPaymentEmail(
      req.user.email,
      classDetails.title,
      classDetails.price,
      session.url,
    );

    // success response
    res.status(200).json({
      success: true,
      message: "Session created and email sent to student.",
      sessionId: session.id,
      paymentUrl: session.url,
    });
  } catch (error) {
    next(error);
  }
};

// get session status
export const getSessionStatus = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    // find the most recent order to get the correct session
    const orderDetails = await Order.findOne({ studentId }).sort({
      createdAt: -1,
    });

    if (!orderDetails) {
      return res.status(404).json({ err: "No orders found for this user" });
    }

    // retrieve session data from stripe
    const session = await stripe.checkout.sessions.retrieve(
      orderDetails.sessionId,
    );

    // success response
    res.status(200).json({
      status: session?.status,
      customer_email: session?.customer_details?.email,
      payment_status: session?.payment_status,
      session_data: session,
    });
  } catch (error) {
    next(error);
  }
};

//  handle payment complete
export const handlePaymentComplete = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    // find the most recent order for the user
    const order = await Order.findOne({ studentId }).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // update payment status to 'completed'
    order.paymentStatus = "completed";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment completed, order status updated",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// handle payment incomplete
export const handlePaymentIncomplete = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    // find the most recent order for the user
    const order = await Order.findOne({ studentId }).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // check payment status is not completed
    if (order.paymentStatus !== "completed") {
      // delete the pending order
      await Order.findByIdAndDelete(order._id);

      return res.status(200).json({
        success: true,
        message: "Incomplete order deleted successfully",
      });
    }

    // handle payment status is completed
    return res.status(400).json({
      success: false,
      message: "Order payment already completed, cannot delete",
    });
  } catch (error) {
    next(error);
  }
};
