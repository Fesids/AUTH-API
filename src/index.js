import { config } from 'dotenv'
import { server } from './SERVER/index.js'
import { DBInit } from './DATABASE/DynamicallyDB.js'

const main = () => {
  config()
  DBInit()

  const port = process.env.PORT || 8000

  server.listen(port, () => {
    console.log(`The auth service has started at port ${port}`)
  })
}

main()
