import users from './userRouter.js';
import products from './productRouter.js';
import carts from './cartRouter.js';
import orders from './orderRouter.js';
import configInfo from '../config/infoConfig.js';
import chat from './chatRouter.js';




export default (app)  =>{
    app.get('/', (req, res)  =>{
        if(req.session.user){
            return res.redirect('products')
        }
        res.redirect('login')
    })

    products(app);
    carts(app);
    app.use(users);
    app.use(orders);
    app.use(configInfo);
    app.use(chat)
    

    app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} inexistente`,
    })
  );

}