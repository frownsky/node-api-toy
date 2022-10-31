const WebSocket = require('ws')
const yup = require('yup')
const wss = new WebSocket.Server({ port: 8080 })

// data.button mapping to actual gpio pins
const userToPin = {
    "USER1": 29, 
    "USER2": 31, 
    "USER3": 33, 
    "USER4": 35  
}

const buttonSchema = yup.object().shape({
    button: yup.string().required(),
    signal: yup.boolean().required()
})

// Client needs to connect to ws://localhost:8080
wss.on("connection", ws => {
    console.log("New Client connected")
    
    ws.on("message", (msg) => {
        let data = JSON.parse(msg)
        buttonSchema.validate(data).then(() => {
            ws.send("Valid")
            // to be replaced by actual gpio commands
            console.log(`${data.button} button: Pin ${userToPin[data.button] || '??'} -> ${data.signal}`)
        }).catch((err) => {
            ws.send("Not valid!")
            console.log(err.toString())
        })
    })
    ws.on("close", () => {
        console.log("Client disconnected")
    })
})

wss.on('listening',() => {
    console.log(`Listening on 8080`)
})

