import React from 'react'
import './ChatHeadar.scss'

/* muiicons */
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PushPinIcon from '@mui/icons-material/PushPin';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
  channelName:string|null,
}

const ChatHeadar = (props:Props) => {
  const { channelName } = props;

  return (
    <div className='chatHeader'>
        <div className='chatHeaderLeft'>
            <h3>
            <span>#</span>
            {channelName}
            </h3>
        </div>
        <div className='chatHeaderRight'>
            <NotificationsIcon />
            <PeopleAltIcon/>
            <PushPinIcon/>
            <div className='chatHeaderSearch'>
                <input type="text" placeholder='検索'/>
                <SearchIcon/>
            </div>
            <SendIcon/>
            <HelpIcon/>
        </div>
    </div>
  )
}

export default ChatHeadar