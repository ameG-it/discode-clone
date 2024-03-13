import React, { useEffect } from 'react';
import './App.scss';
import Sidebar from './components/sideber/Sideber';
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from './app/hooks'
import { auth } from './firebase';
import { login, logout } from './features/userSlice';


function App() {
  const user = useAppSelector((state)=>state.user);
  
  console.log(user)
  
  const dispath = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((loginuser)=>{
      if (loginuser) {
        dispath(login({
          uid:loginuser.uid,
          photo: loginuser.photoURL,
          displayname: loginuser.displayName,
        }))
      }else{
        dispath(logout());
      }
      console.log(loginuser);
    })
  },[dispath])
  
  return (
    <div className="App">

      {user ? (
        <>
          {/* sidebber */}
            <Sidebar/>
          {/* chat */}
          <Chat/>
        </>) : (<>
        <Login/>
        </>)}
    </div>
  );
}

export default App;
