import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage';
import CreateLPage from './pages/CreateLPage/CreateLPage';
import UnknownLPage from './pages/UnknownLPage/UnknownLPage';

export const useRoute = (isLogin) => {
    return(
        <Routes>
            <Route path="/" element={ <MainPage /> }/>
            <Route path='/auth/*' element={ <AuthPage /> } />
            <Route path='/createL' element={ isLogin ? <CreateLPage /> : <MainPage /> } />
            <Route path='*' element={ <UnknownLPage /> } />
        </Routes>
    )
}