import React from 'react'
import './Chat.scss'

import ChatHeadar from './ChatHeadar'
import ChatMassage from './ChatMassage'

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifBoxIcon from '@mui/icons-material/GifBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Chat() {
  return (<div className='chat'>
        {/* chat header */}
        <ChatHeadar/>
        {/* chat Massage */}
        <div className='chatMassage'>
            <ChatMassage/>
        </div>
        {/* chat Input */}
        <div className='chatInput'>
            <AddCircleIcon/>
            <form action="submit">
                <textarea id="t_message" name="message" rows={1} placeholder="メッセージを送信" ></textarea>
                <button type='submit' className='chatInputbutton'>送信</button>
            </form>
            <div className='chatInputIcons'>
                <GifBoxIcon/>
                <EmojiEmotionsIcon/>
            </div>
        </div>

    
    
    </div>
  )
}

export default Chat