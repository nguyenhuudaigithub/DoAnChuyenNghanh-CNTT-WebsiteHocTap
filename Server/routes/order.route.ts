import express from 'express';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import {
  addCourseFreeToUser,
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from '../controllers/order.controller';
const orderRouter = express.Router();
orderRouter.post('/create-order', isAutheticated, createOrder);
orderRouter.get(
  '/get-orders',
  isAutheticated,
  authorizeRoles('admin'),
  getAllOrders
);

orderRouter.get('/payment/stripepublishablekey', sendStripePublishableKey);

orderRouter.post('/payment', isAutheticated, newPayment);

orderRouter.post('/addCourseFreeToUser',isAutheticated,addCourseFreeToUser);

export default orderRouter;
