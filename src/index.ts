import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as morgan from 'morgan'
import * as cors from 'cors'

import { envSchema } from './config/env'

import auth from './routes/auth.route'
import user from './routes/user.route'

import { CustomError, NotFoundError } from './utils/exceptions'
import { AppDataSource } from './config/db'

dotenv.config()

// Validate Schema
try {
  envSchema.parse(process.env)
  console.log(process.env)
} catch (error) {
  console.error('Invalid environment variables:', error.errors)
  process.exit(1) // Exit the process if validation fails
}

// Connnect to DB
AppDataSource.initialize()
  .then(() => console.log('Connected to Database !!'))
  .catch((err) => console.log(err))

// APP Initialization
const app = express()

// Global Middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

// ROUTES
app.use('/auth', auth)
app.use('/users', user)

// Not Found
app.use('*', () => {
  throw new NotFoundError()
})

// Default Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log(err)
  console.log('ERROR OCCURED: ', err.message)
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message })
  } else {
    // Handle non-custom errors
    res.status(500).json({ message: err.message || 'Internal Server Error' })
  }
})

app.listen(process.env.PORT || 8080, () =>
  console.log('App Listening to port 8080'),
)
