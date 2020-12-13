import React from 'react';
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from "./SidebarChat"

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src='https://avatars1.githubusercontent.com/u/50643749?s=460&u=79ccbfd63dec7fd6714bba701f5a22073e286396&v=4'/>
                <div className="sidebar__headerRight">
                    <IconButton>
                   <DonutLargeIcon />
                   </IconButton>
                   <IconButton>
                   <ChatIcon/>
                   </IconButton>
                   <IconButton>
                   <MoreVertIcon />
                   </IconButton>
                </div>
            </div> 
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
