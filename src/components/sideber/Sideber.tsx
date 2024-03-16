import React, { useEffect, useState } from 'react'
import './Sideber.scss'
import SidebarChannel from '../sidevarChannels/SidebarChannel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';

function Sideber() {
  const user = useAppSelector((state) => state.user)
  const { documents:channels } = useCollection("channels");
  
  const addChannel =async ()=>{
    let channelName :string | null = prompt("新しいチャンネルを作成します。")
    
    if(channelName){
        await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  }

  return (
    <div className='sidebar'>
      {/* sideber-left */}
      <div className='sidebarLeft'>
        <div className='serverIcon'>
          <img src="./logo192.png" alt="" />
        </div>
        <div className='serverIcon'>
          <img src="./logo192.png" alt="" />
        </div>
        <div className='serverIcon'>
          <img src="./logo192.png" alt="" />
        </div>
      </div>
      {/* sideber-right */}
      <div className='sidebarRight'>
        <div className='sidebarTop'>
          <h3>Discord</h3>
          <ExpandMoreIcon/>
        </div>
        <div className='sidebarChanels'>
          <div className='sidebarChanelsHeader'>
            <div className='sidebarChanelsTitle'>
              <ExpandMoreIcon/>
              <h4>まるまるチャネル</h4>
            </div>
            <AddIcon onClick={()=>{addChannel()}}/>
          </div>
          {channels.map((channel)=>{
            return <SidebarChannel channel={channel} id={channel.id} key={channel.id}/>
          })}
          <div className='sidebarFooter'>
            <div className='sidebarAccount'>
              <div className='fotterLogo'>
                <img src={user?.photo} alt="" onClick={()=>{auth.signOut()}} />
              </div>
              <div className='account'>
                <h4>{user?.displayName}</h4>
                <span>{user?.uid.substring(0,4)}</span>
              </div>
            </div>
            <div className='sidebarVoice'>
              <MicIcon/>
              <HeadphonesIcon/>
              <SettingsIcon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sideber