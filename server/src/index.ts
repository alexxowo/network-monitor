import express, {Application, Request, Response} from 'express'
import morgan from 'morgan';
import { Socket } from 'socket.io';
import { Agent } from './types/agent';

import cronManager from './modules/cron.module'

// Routes
import indexRoutes from './routes/index.routes';
import hostsRoutes from './routes/hosts.routes';

import { Host } from './types/host';

class Server{
  public app: Application;
  public port: Number;

  constructor(){
    this.app = express();
    this.port = 2000;
  }

  config():void{
    // Middlewares
    this.app.use(morgan(('dev')))
    this.app.use(express.json())
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');    
      next();
    })

    // Controllers
    this.app.use("/", indexRoutes)
    this.app.use("/hosts", hostsRoutes)
  }

  start() : void {
    this.config()

    //cronManager.config()

    this.app.listen(this.port, () => {
      console.log('Server is running')
    })

  }

}

const server = new Server();
server.start()
