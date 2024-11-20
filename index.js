const express = require('express')
const mainRouter = require('./src/routers/index');
const { PORT } = require('./src/configs/config');
const morgan = require('morgan');
const dbconnect = require('./src/configs/dbconnect');

const app = express();

//moddleweres

app.use(express.json());
app.use(morgan('common'))


///default router
app.get('/', (req, res)=>{
    res.json({
        status: "ok"
    })
})

// main router 

app.use('/', mainRouter)

//listening on port

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
    
})

dbconnect()