import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

// Details on Middlewares
//Body parsing middleware to handle the complexities of parsing streamable request objects, so we can simplify browser-server
//communication by exchanging JSON in the request body
//Cookie parsing middleware to parse and set cookies in request objects
//Compression middleware that will attempt to compress response bodies for all requests that traverse through the Middlewares
//A collection of middleware functions to help secure Express apps by setting various HTTP headers
//Middleware to enable CORS (Cross-origin resource sharing)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(Template())
});

app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

export default app
