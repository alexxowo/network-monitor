import express, {Application, Request, Response} from 'express'
import morgan from 'morgan';
import { Socket } from 'socket.io';
import { Agent } from './types/agent';
import cron from 'node-cron'

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
    this.app.use(morgan(('dev')))
    this.app.use(express.json())
  }

  router() : void {
    const hostTest = new Host('Laptop', '192.168.69.93', 10050, Agent.Agent)

    this.app.get('/', (req: Request, res: Response) => {
      res.json(hostTest)
    })
  }

  start() : void {
    this.config()
    this.router()

    cron.schedule("*/1 * * * *", () => {
      console.log('Hola Mundo')
    })

    this.app.listen(this.port, () => {
      console.log('Server is running')
    })

  }

}

const server = new Server();
server.start()
