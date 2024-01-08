import express, { ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import webhook from './webhook'

const port = process.env.PORT || 8080
const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
      origin: '*', // TODO FRONT_URL
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
)

app.post(
    '/webhook',
    asyncHandler(async (req, res) => {
        const answer = await webhook(req.body)
        res.json(answer)
    })
)

const customErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    return res.status(500).send()
  }

app.use(customErrorHandler)