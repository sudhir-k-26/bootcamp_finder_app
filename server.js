const express = require('express');
const dotenv  = require('dotenv');
const morgan  = require('morgan');
const colors  = require('colors');
const cors    = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB    = require('./config/db');
const errorHandler = require('./middleware/error');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const  path = require('path');




// load env variables
dotenv.config({path:'./config/config.env'});
// connect to DB
connectDB();


// Route files
const bootcamps = require('./routes/bootcamps');
const courses   = require('./routes/courses');
const auth      = require('./routes/auth');
const users      = require('./routes/users');
const reviews      = require('./routes/reviews');



const app = express();

// if(process.env.NODE_ENV==='development')
//{

//activate cors

app.use(cors());
// app.use(cors(
   // {
    // origin: 'http://localhost:3000',
	// credentials:true,
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }
// ));
// }
// app.use(function(req, res, next) {
  
  // res.header('Access-Control-Allow-Origin', "http://localhost:3000")
  
  // next()
// })

// File Uploading

app.use(fileupload());



// set static folder

app.use(express.static(path.join(__dirname,'public')))

// Body Parser
app.use(express.json());

// set security headers 

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "https: data:"]
    }
  })
)


// prevent xss attacks

app.use(xss());

// Sanitize data
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);


// Prevent http param pollution
app.use(hpp());

// Cookie Parser

app.use(cookieParser());
// Dev logging middleware

if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
}


// Mount Routes
app.use('/api/v1/bootcamps',bootcamps);

app.use('/api/v1/courses',courses);

app.use('/api/v1/auth',auth);

app.use('/api/v1/users',users);

app.use('/api/v1/reviews',reviews);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled Rejection at: ${promise} reason:  ${reason}`.red);
    // closing server and exit process
    server.close(()=>{process.exit(1)});
    
  });