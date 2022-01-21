import {Request, Response} from 'express'
import DB from '../database'

import { Agent } from '../types/agent'
import { Host } from '../types/host'

class hostsController {

  index(req: Request, res: Response): void{
    res.status(200).json({
      message: "Hosts index"
    })
  }

   async insert(req: Request, res: Response): Promise<void> {
    const host: Host = req.body

    await (await DB).query(`INSERT INTO hosts(hostname, address, port, agent, description) SELECT * FROM (SELECT '${host.hostname}','${host.address}',${host.port},${host.agent},'${host.description}') as tmp WHERE NOT EXISTS (SELECT address FROM hosts WHERE address = '${host.address}') LIMIT 1`)
    .then(result => {
      res.json({
        message: "Host inserted",
        host: host,
        response: result
      })
    })
    .catch(err => { res.status(500).json({message: err}) })
  }

  async list(req: Request, res: Response): Promise<void> {
    const hosts: Array<Host> = await (await DB).query(`SELECT * FROM hosts INNER JOIN agents ON hosts.agent = agents.id`)
    res.json({hosts})
  }


  async get(req: Request, res: Response): Promise<void>{
    const host: Host = await (await DB).query(`SELECT * FROM hosts INNER JOIN agents ON hosts.agent = agents.id WHERE hosts.id = ${req.params.id}`)
    res.json({host})
  }


}

export default new hostsController();