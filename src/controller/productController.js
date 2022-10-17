import productsDao from '../DAO/productDao.js';

class ProductsController{
    
    async getProducts(req, res){
        try{
            const products = await productsDao.getAll();
            if(products.length === 0){
                return res.json({error: 'Sin productos'})
            }
            return res.status(200).json(products);
        }catch(error){
            console.log(error)
            return res.status(500).json({ error_description: 'Server error.' });
        }
    }
    async getProductsByCategory(req, res){
        try{
            const categoty = req.params.categoty;
            const products = await productsDao.getByCategory(categoty)
            if(products.length === 0){
                return res.json({ error: 'Sin productos' });
            }
            return res.status(200).json(products)
        }catch(error){
            console.log(error)
            return res.status(500).json({ error_description: 'Server error'});
        }
    }

    async getProduct(req, res){
        try{
            const id = req.params.id;
            const product = await productsDao.get(id);

            if(!product){
                res.status(400).json({error_description: 'Producto no encontrado'});
            }
            res.status(200).json(product);
        }catch(error){
            console.log(error)
            return res.status(500).json({error_description: 'Producto no encontrado'});
        }
    }

    async createProduct(req, res){
        try{
            const product = req.body;
            const newProduct = await productsDao.create(product);

            res.status(200).json({message: 'Producto creado', product: newProduct})
        }catch(error){
            console.log(error)
            return res.status(500).json({error_description: 'Server error'})
        }
    }
    async updateProduct(req, res){
        try{
            const updateProduct = req.body;
            const id = req.params.id;
            if(await productsDao.update(id, updateProduct)){
                const product = {
                    _id: id,
                    ...updatedProduct,
                  };
                  return res.status(201).json({ product });
                } 
            return res.status(404).json({ error_description: 'Producto no encontrado.' });
        }catch(error){
            console.log(error)
            return res.status(500).json({error_description: 'Server error'})
        }
    }
    async deleteProduct(req, res) {
        try {
          const product = await productsDao.delete(req.params.id);
          if (!product) {
            return res
              .status(404)
              .json({ error_description: 'Producto no encontrado.' });
          }
          res.status(200).json({ message: 'Producto eliminado' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error_description: 'Error de servidor.' });
        }
      }
    
      async addProductCart(req, res) {
        try {
          const productId = req.params.id;
          const { quantity } = req.body;
          const userId = req.user._id;
          productsDao.addProductCart(productId, quantity, userId);
          res.status(200).json({ message: 'Producto agregado al carrito' });
        } catch (error) {
          console.log(`Error al agregar producto carrito. ${error}`);
          return res.status(500).json({ error_description: 'Server error.' });
        }
      }
            
    }
export default new ProductsController();