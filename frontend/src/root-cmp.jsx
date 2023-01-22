import React from 'react'
import { Routes, Route } from 'react-router'
import { useState, useEffect, useRef , useImperativeHandle, forwardRef} from 'react'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { GigDetails } from './pages/gig-details'
import { GigPayment } from "./pages/gig-payment.jsx";

export function RootCmp() {
    const [isGigDetails, setIsGigDetails] = useState(false);

  


  
    return (
        <div className='main-container'>
            {/* <AppHeader ref={headerRef}/> */}
            <AppHeader  />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="gig/:id" element={<GigDetails setIsGigDetails={setIsGigDetails}  />} />
                    <Route path="payments/:id" element={<GigPayment />} />
                    
                   
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


