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

    // Controllers
    this.app.use("/", indexRoutes)
    this.app.use("/hosts", hostsRoutes)
  }

  start() : void {
    this.config()

    cronManager.config()

    this.app.listen(this.port, () => {
      console.log('Server is running')
    })

  }

}

const server = new Server();
server.start()
