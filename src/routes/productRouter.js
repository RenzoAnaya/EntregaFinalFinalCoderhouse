import { Router } from "express";
import productController from '../controller/productController.js';
import authToken from '../middleware/authToken.js'

const productRouter = new Router();

export default (app) =>{
    app.use('/products', productRouter);

    productRouter.get('/',  productController.getProducts);
  
    productRouter.get(
      '/category/:category',
      
      productController.getProductsByCategory
    );
  
    productRouter.get('/:id', productController.getProduct);
  
    productRouter.post('/', authToken, productController.createProduct);
  
    productRouter.put('/:id', authToken, productController.updateProduct);
  
    productRouter.delete('/:id', authToken, productController.deleteProduct);
  
}