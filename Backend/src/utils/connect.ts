import { createPool, Pool } from 'mysql2/promise'
import dotenv from 'dotenv'


dotenv.config()

const connectToDatabase = (): Pool => {
  try {
    const pool = createPool({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || "3306", 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB,
      waitForConnections: true, 
      connectionLimit: 10,      
      queueLimit: 0             
    })

    // pool.getConnection()
    //   .then(() => {
    //     console.log('Connected to the MySQL database')
    //   })
    //   .catch(err => {
    //     console.error('Error connecting to the MySQL database:', err)
    //   })

    return pool 
  } catch (error) {
    console.error('Error while setting up the database connection:', error)
    throw error 
  }
}

export default connectToDatabase
