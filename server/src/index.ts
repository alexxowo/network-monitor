import express, {Application, Request, Response} from 'express'
import morgan from 'morgan';
import { Socket } from 'socket.io';
import { Agent } from './types/agent';
import cron from 'node-cron'

// Routes
import indexController from './controllers/index.controller'

import { Host } from './types/host';

class Server{
  public app: Application;
  public port: Number;
  //public socket:Socket;

  constructor(){
    this.app = express();
    this.port = 2000;
  }

  config():void{
    // Middlewares
    this.app.use(morgan(('dev')))
    this.app.use(express.json())

    // Controllers
    this.app.use(indexController.index)

  }

  start() : void {
    this.config()

    this.app.listen(this.port, () => {
      console.log('Server is running')
    })

  }

}

const server = new Server();
server.start()
