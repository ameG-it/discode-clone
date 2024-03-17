import React, { useEffect, useRef, useState } from 'react'
import './Chat.scss'
import ChatHeadar from './ChatHeadar'
import ChatMassage from './ChatMassage'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifBoxIcon from '@mui/icons-material/GifBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';


interface Messages{
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

function Chat() {
    const hiddenButtonRef = useRef<HTMLButtonElement>(null);
    const [inputText ,setInputText]=useState<string>("")
    const [messages, setMessages]=useState<Messages[]>([])
    const channelName = useAppSelector((state)=>state.channel.channelName);
    const channelId = useAppSelector((state)=>state.channel.channelId);
    const user = useAppSelector((state)=>state.user.user)


    useEffect(()=>{
        let collectionRef = collection(db,"channels",String(channelId),"messages");
        const collectionOrderBy = query(collectionRef,orderBy("timeStamp","asc"));
        onSnapshot(collectionOrderBy,(snapshot)=>{
            const results: Messages[]=[]
            snapshot.docs.forEach((doc)=>{
                results.push({
                    messageId: doc.data().id,
                    message: doc.data().message,
                    timeStamp:doc.data().timeStamp,
                    user:doc.data().user,
                })
            })

            
            setMessages(results);
        });
    },[channelId])

    const sendMessage = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        const collectionRef: CollectionReference<DocumentData> = collection(db,"channels",String(channelId),"messages")

        const docRef:DocumentReference<DocumentData> = await addDoc(collectionRef, {
            message: inputText,
            timeStamp:serverTimestamp(),
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
              setInputText("")
            }
          }
      };


    return (<div className='chat'>
        {/* chat header */}
        <ChatHeadar channelName={channelName}/>
        {/* chat Massage */}
        <div className='chatMassage'>
            {messages.map((message, index)=>{
                return <ChatMassage 
                key={index}
                messageId={message.messageId}
                timeStamp={message.timeStamp}
                message={message.message}
                user={message.user}/>
            })}
        </div>
        {/* chat Input */}
        <div className='chatInput'>
            <AddCircleIcon/>
            <form action="submit">
                <textarea id="t_message" name="message" value={inputText} onKeyDown={(e:React.KeyboardEvent<HTMLTextAreaElement>)=>handleKeyDown(e)}rows={1} placeholder="メッセージを送信" onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setInputText(e.target.value)}}></textarea>
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