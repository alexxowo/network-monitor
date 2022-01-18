import {Router, Request, Response} from 'express'
import indexController from '../controllers/index.controller'

class indexRouter{
  public router: Router = Router();
  constructor(){
    this.config();
  }

  config() : void {
    this.router.get('/', indexController.index)
    this.router.get('/info', indexController.info)
  }

}

const IR = new indexRouter();
export default IR.router;
