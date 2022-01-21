import { Router } from "express";
import hostController from '../controllers/hosts.controller';

class hostsRouter{
  public router: Router = Router();
  constructor(){
    this.config();
  }

  config() : void {
    this.router.get('/', hostController.index)
    this.router.post('/add', hostController.insert)
    this.router.get('/list', hostController.list)
    this.router.get('/get/:id', hostController.get)
  }
}

const HR = new hostsRouter();
export default HR.router;