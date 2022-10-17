import { Router } from "express";
import orderController from '../controller/orderController.js'
import authToken from '../middleware/authToken.js';

const orderRouter = new Router();

orderRouter.post('/order', authToken, orderController.checkOut);

orderRouter.get('/order/', orderController.getOrders);

export default orderRouter;
