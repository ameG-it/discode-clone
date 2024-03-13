import React from 'react'
import './ChatMassage.scss'

/**MuiIcons */
import {Avatar} from '@mui/material';

const ChatMassage = () => {
  return (
    <div className='massage'>
        <div className='massageUserIcon'>
            <Avatar/>
        </div>
        <div className='massageInfo'>
            <h4 >User Name
                <span className='timeStamp'>2024.01.01</span>
            </h4>
            <p>本文です</p>
        </div>
    </div>
  )
}

export default ChatMassage