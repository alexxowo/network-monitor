import express, {Application, Request, Response} from 'express'
import morgan from 'morgan';
import { Socket } from 'socket.io';

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
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        title:'Monitor API',
        message:'API for monitor software'
      })
    })
  }

  start() : void {
    this.config()
    this.router()

    this.app.listen(this.port, () => {
      console.log('Server is running')
    })

  }

}

const server = new Server();
server.start()
