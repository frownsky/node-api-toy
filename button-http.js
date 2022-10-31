const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post("/", (req, res) => {
    let button = req.body.button
    let signal = req.body.output
    console.log(req.body)

    if (button == "RESET"){
        console.log("trigger reset button") // signal doesnt matter
    }
    if (button == "USER"){
        console.log(`trigger ${button} to ${signal}`)
    }
    res.status(200).send("success")
})

// Client needs to connect to localhost:3000
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})