import mySql from 'promise-mysql'

const credentials = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'monitor'
}

const myPool = mySql.createPool(credentials)

myPool.then(connection => {
  connection.release;
  console.log(new Date(), 'Database connected')
})


export default myPool
