import React from 'react'
import './ChatMassage.scss'

/**MuiIcons */
import {Avatar} from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props={
  messageId:String,
  timeStamp:Timestamp,
  message:string,
  user:{
        uid: string;
        photo: string;
        email: string;
        displayName: string;
  }
}


const ChatMassage = (props:Props) => {
  const {messageId, timeStamp, message, user}= props;
  return (
    <div className='massage'>
        <div className='massageUserIcon'>
            <Avatar src={user?.photo}/>
        </div>
        <div className='massageInfo'>
            <h4 >{user?.displayName}
                <span className='timeStamp'>{new Date(timeStamp?.toDate()).toLocaleString()}</span>
            </h4>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default ChatMassage