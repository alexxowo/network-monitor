import {Request, Response} from 'express'
import os from 'os'


class indexController {
  index(req: Request, res: Response): void {
    res.status(200).json({
      title: "Network Monitoring API",
      message: ""
    })
  }

  info(req: Request, res: Response): void{
    const hostname = os.hostname();
    res.status(200).json({
      hostname: hostname,
      memory_free: (os.freemem()*1e-9),
      memory_total: os.totalmem() * 1e-9,
      uptime: os.uptime(),
      os: os.type(),
      network_interfaces: os.networkInterfaces(),
      loadavg: os.loadavg(),
      cpu_info: os.cpus()
    })
  }

}

export default new indexController();
