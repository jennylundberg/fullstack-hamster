const express = require('express')
const app = express();
const hamstersRouter = require('./routes/hamsters.js')
const cors = require('cors')


const PORT = process.env.PORT || 1337;


//Middleware
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use(cors())

//lägg till /images/hamster-siffra.jpg 
//för att få upp hamsterbilder
app.use("/images", express.static(__dirname + "/images"))
app.use('/', express.static('./build'))

//Logger
app.use( (req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})

// Routes endpoints
app.use('/hamsters', hamstersRouter)

app.get('*', (req, res) => {
    res.send('./build/index.html')
})


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})