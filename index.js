const express = require('express')
const mainRouter = require('./src/routers/index');
const { PORT } = require('./src/configs/config');
const morgan = require('morgan');
const dbconnect = require('./src/configs/dbconnect');
const { success } = require('./src/utils/responseWrapper');
const cookieParser = require('cookie-parser');

const app = express();

//moddleweres

app.use(express.json());
app.use(morgan('common'))
app.use(cookieParser())


///default router
app.get('/', (req, res)=>{
    res.send(
        success(200, {
            status: 'working at full capacity'
        })
    )
})

// main router 

app.use('/', mainRouter)

//listening on port

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
    
})

dbconnect()