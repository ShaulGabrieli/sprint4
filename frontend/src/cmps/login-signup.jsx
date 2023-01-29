import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from "../store/user.actions.js";
import { useNavigate } from 'react-router-dom';

export function LoginSignup({ isLogin, isJoin, BlackLogo, setHeaderStyle, setLogo }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    // const [isSignup, setIsSignup] = useState(false)
    // const [isJoin, setIsJoin] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     loadUsers()
    // }, [])

    useEffect(() => {
        document.body.classList.add('popup-menu-open')
        return () => {
            document.body.classList.remove('popup-menu-open')
            setHeaderStyle("sticky")
             setLogo(<BlackLogo/>)
        }
       
    }, [])

    // async function loadUsers() {
    //     const users = await userService.getUsers()
    //     setUsers(users)
    // }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '', wishlist: [] })
        // setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function loginCheck(credentials) {
        try {
            console.log('credentials', credentials);
            const user = await login(credentials);
            showSuccessMsg(`Welcome, ${user.fullname}`);
        } catch (err) {
            showErrorMsg("Cannot login");
        }
    }
    async function signupCheck(credentials) {
        try {
            const user = await signup(credentials);
            showSuccessMsg(`${user.fullname} ,Welcome to Gigxerr!`);
        } catch (err) {
            showErrorMsg("Cannot signup");
        }
    }

    function onLogin(ev = null) {
        try {
            if (ev) ev.preventDefault()
            if (!credentials.username) return
            loginCheck(credentials)
            clearState()
            navigate('/gig')
        }
        catch (err) {
            console.log('err', err);
            showErrorMsg("Cannot login");
        }
    }

        function onSignup(ev = null) {
            try {
                if (ev) ev.preventDefault()
                if (!credentials.username || !credentials.password || !credentials.fullname) return
                signupCheck(credentials)
                clearState()
           
                // setLogo(<BlackLogo />)
                navigate('/gig')
            }
            catch (err) {
                console.log('err', err);
                showErrorMsg("Cannot join");
            }

        }

        function toggleSignup() {
            // setIsSignup(!isSignup)
        }

        function onUploaded(imgUrl) {
            setCredentials({ ...credentials, imgUrl })
        }

        return (
            <div className="login-page flex">
                {/* <p>
                <button onClick={toggleSignup}>{!isSignup ? 'Join' : 'Login'}</button>
            </p> */}
                {isLogin && <form className="login-form " onSubmit={onLogin}>
                    {/* <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select> */}
                    <div className="main-login-container flex column">

                        <h2>Sign in to Gigxerr! </h2>

                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button className='login-btn' onClick={(ev) => {
                            ev.stopPropagation()
                        }}>Sign In</button>
                        <div className="notAMember"></div>
                    </div>

                </form>}
                <div className="signup-section">
                    {isJoin && <form className="signup-form" onSubmit={onSignup}>
                        <div className="main-login-container flex column">

                            <h2>Join the Gigxerr! </h2>

                            <input
                                type="text"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder="Fullname"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <ImgUploader onUploaded={onUploaded} />
                            <button className='login-btn'>Join!</button>
                            {/* <BlackLogo/> */}
                        </div>

                    </form>}
                </div>
            </div>
        )
    
}