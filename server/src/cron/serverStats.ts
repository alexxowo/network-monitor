import { cronFunctions } from '../interfaces/cron.interface'
import os from 'os'
import DB from '../database'

class serverStats implements cronFunctions {
  run() : void{
    let fecha = new Date().getTime()
    let hostname = os.hostname
    let memory_free = (os.freemem()*1e-9)
    let memory_total = (os.totalmem() * 1e-9)
    let uptime = os.uptime()
    let system = os.type()
    let network_interfaces = os.networkInterfaces()
    let loadavg = os.loadavg()
    let cpu_info = os.cpus()



  }
}

export default new serverStats();
