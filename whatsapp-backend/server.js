import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher'
import cors from 'cors'


const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1122519",
    key: "79f409bd004a2137c701",
    secret: "a6b153b703d5fc29f8ac",
    cluster: "us2",
    useTLS: true
  });
  

app.use(express.json())
app.use(cors())

const connection_url = 'mongodb+srv://admin:fkERkVz9LGvk3wbT@cluster0.1zvul.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection
db.once('open',() => {
    console.log('DB is connected')

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch()
    changeStream.on('change',(change) => {
        console.log(change)

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted', {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp
            })
        }
        else {
            console.log('Error triggering Pusher')
        }
    })
})

app.get('/',(req,res) => res.status(200).send('hello world'))

app.get('/messages/sync',(req,res) => {
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

app.listen(port,() => console.log(`Listening on localhost:${port}`))