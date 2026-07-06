import { Router } from "express";
import {
  createCheckoutSession,
  getSessionStatus,
  handlePaymentComplete,
  handlePaymentIncomplete,
} from "../../controllers/paymentController.js";

// config router
export const paymentRouter = Router();

// create checkout session
paymentRouter.post("/checkout", createCheckoutSession);

// get session status
paymentRouter.get("/session", getSessionStatus);

// payment complete
paymentRouter.post("/payment-complete", handlePaymentComplete);

// payment incomplete
paymentRouter.get("/payment-incomplete", handlePaymentIncomplete);
