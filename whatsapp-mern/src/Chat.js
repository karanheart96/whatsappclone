import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './Chat.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";

function Chat({ messages }) {
    const [input,setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: "Demp app",
            timestamp: "Just now",
            received: false
        })

        setInput("");
    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat__headerRight'>
                <IconButton>
                   <DonutLargeIcon />
                   </IconButton>
                   <IconButton>
                   <AttachFileIcon/>
                   </IconButton>
                   <IconButton>
                   <MoreVertIcon />
                   </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (

<p className={`chat__message ${message.received && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
{message.message}
<span className="chat__timestamp">
    {message.timestamp}
</span>
</p>

                ))}
                
                
                
            </div>

           <div className="chat__footer">
               <InsertEmoticonIcon />
               <form>
                   <input value={input} onChange={ e => setInput(e.target.value)}
                   placeholder="Type a message"
                   type="text" />
                   <button onClick={sendMessage} type="submit">Send a message</button>
               </form>

               </div> 
        </div>
    )
}

export default Chat
