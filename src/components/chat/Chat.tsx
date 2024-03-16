import React, { useRef, useState } from 'react'
import './Chat.scss'
import ChatHeadar from './ChatHeadar'
import ChatMassage from './ChatMassage'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifBoxIcon from '@mui/icons-material/GifBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, DocumentReference, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';


function Chat() {
    const hiddenButtonRef = useRef<HTMLButtonElement>(null);
    const [inputText ,setInputText]=useState<string>("")
    const channelName = useAppSelector((state)=>state.channel.channelName);
    const channelId = useAppSelector((state)=>state.channel.channelId);
    const user = useAppSelector((state)=>state.user.user)

    const sendMessage = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const collectionRef: CollectionReference<DocumentData> = collection(db,"channels",String(channelId),"messages")

        const docRef:DocumentReference<DocumentData> = await addDoc(collectionRef, {
            message: inputText,
            timestamp:serverTimestamp(),
            user: user,
        })
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
              // Shift + Enterが押されたときの処理
              e.preventDefault(); // デフォルトのEnterキーの挙動を抑制する
              setInputText(inputText+ '\n'); // 改行を追加するなどの処理
            } else {
              // Enterキーのみが押されたときの処理
              e.preventDefault(); // デフォルトのEnterキーの挙動を抑制する
              console.log(hiddenButtonRef.current)
              hiddenButtonRef.current?.click(); // 隠しボタンをクリック
            }
          }
      };


    return (<div className='chat'>
        {/* chat header */}
        <ChatHeadar channelName={channelName}/>
        {/* chat Massage */}
        <div className='chatMassage'>
            <ChatMassage/>
        </div>
        {/* chat Input */}
        <div className='chatInput'>
            <AddCircleIcon/>
            <form action="submit">
                <textarea id="t_message" name="message" onKeyDown={(e:React.KeyboardEvent<HTMLTextAreaElement>)=>handleKeyDown(e)}rows={1} placeholder="メッセージを送信" onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setInputText(e.target.value)}}></textarea>
                <button type='submit' className='chatInputbutton' ref={hiddenButtonRef}onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>sendMessage(e)}>送信</button>
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