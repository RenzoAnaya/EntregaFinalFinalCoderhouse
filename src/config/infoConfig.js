import { Router } from "express";

const infoRouter = new Router();

import config from "./config.js";

infoRouter.get('/info', (req, res) => {
    res.render('info', { config });
  });
  
  export default infoRouter;