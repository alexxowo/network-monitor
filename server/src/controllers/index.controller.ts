import {request, Request, Response} from 'express'
import os from 'os'

import DB from '../database'

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

  async stats(req: Request, res: Response): Promise<void>{
    const key = req.query.key;

    console.log(key)

    if(key === '' || key === undefined){
      res.status(400).json({response: "error", message: "key is required"})
    }

    if (key != 'all'){
      const stats = await (await DB).query(`
        SELECT items.key as item, items.host_id, items.value as item_value, items.unixtime 
        FROM items LEFT JOIN hosts AS host ON items.host_id = host.id 
        WHERE host.id = items.host_id AND items.unixtime > unix_timestamp((NOW() - INTERVAL 15 MINUTE))
        ORDER BY items.unixtime DESC
      `)

      res.status(200).json(stats);
    }

    const stats = await (await DB).query(`
      SELECT items.key as item, items.host_id, items.value as item_value, items.unixtime 
      FROM items LEFT JOIN hosts AS host ON items.host_id = host.id 
      WHERE host.id = items.host_id AND items.unixtime > unix_timestamp((NOW() - INTERVAL 15 MINUTE))
      AND items.key = '${key}'
      ORDER BY items.unixtime DESC
    `)

  res.status(200).json(stats);

  }

}

export default new indexController();
