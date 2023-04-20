import logo from './logo.svg';
import './App.css';
import Aside from './component/aside/aside';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from 'react';
import Preloader from './assets/preloader/preloader';
const  MessageContainer = React.lazy(() => import('./component/chat/messageContainer'));// реакт лейзи не прогружает все сразу
const  Login = React.lazy(() => import('./component/login/login'));
const  HeaderContainer = React.lazy(() => import('./component/header/headerContainer'));
const  UserContainer = React.lazy(() => import('./component/Users/userContainer'));
const  ProfileContainer = React.lazy(() => import('./component/profile/profileContainer'));// саспенс нужен для того, чтобы показывать прелоудер пока грузит
function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderContainer />
        <main className="main">
          <div className="main__container">
            <Aside />
            <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path='/message/*' element={<MessageContainer />} />
              <Route path='/users/*' element={<UserContainer />} />
              <Route path='/login/*' element={<Login/>} />
            </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
