import { cronFunctions } from '../interfaces/cron.interface'
import os from 'os'
import DB from '../database'

import utils from 'os-utils'

class serverStats implements cronFunctions {
  public run = async () =>{
    let fecha = new Date().getTime()
    let hostname = os.hostname
    let memory_free = (os.freemem()*1e-9)
    let memory_total = (os.totalmem() * 1e-9)
    let uptime = os.uptime()
    let system = os.type()
    let network_interfaces = os.networkInterfaces()
    let loadavg = os.loadavg()
    let cpu_info = os.cpus()

    await (await DB).query(`
      INSERT INTO items(items.key, host_id, value, unixtime) 
      SELECT 'system.hw.memory.free', hosts.id, ${memory_free},${new Date().getTime() * 0.001}
      FROM hosts WHERE hosts.address = "127.0.0.1"
      UNION ALL
      SELECT 'system.hw.memory.total', hosts.id, ${memory_total},${new Date().getTime() * 0.001}
      FROM hosts WHERE hosts.address = "127.0.0.1"
      UNION ALL
      SELECT 'system.hw.memory.free', hosts.id, ${memory_free},${new Date().getTime() * 0.001}
      FROM hosts WHERE hosts.address = "127.0.0.1"
    `)

    console.log('Added')

  }
}

export default new serverStats();
