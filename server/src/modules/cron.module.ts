import cron from 'node-cron'

import serverStats from '../cron/serverStats'

class cronManager {
  
  config(): void{
    cron.schedule("*/1 * * * *", () => {
      serverStats.run()
    })
  }

}

export default new cronManager();
