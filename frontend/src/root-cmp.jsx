import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { GigDetails } from './pages/gig-details'
import { GigEdit } from './pages/gig-edit'

export function RootCmp() {

    return (
        <div className='main-container'>
            <AppHeader />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="gig/:id" element={<GigDetails />} />
                    <Route path='/gig/edit/:gigId' element={<GigEdit />}  />
                        <Route path="/gig/edit" element={<GigEdit />} />
                   
                </Routes>            
            <AppFooter />
        </div>
    )
}


