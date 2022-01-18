import {Request, Response} from 'express'

class indexController {
  index(req: Request, res: Response): void {
    res.status(200).json({
      title: "Network Monitoring API",
      message: ""
    })
  }
}

export default new indexController();