import React, { useEffect, useState } from 'react';
import styles from './styles/LoginPage.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setState } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import UserServices from '../UserServices';
import { setSpinnerMessage } from '../redux/dataSlice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Icons from './icons/Icons';

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.authentication?.isAuthenticated);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [creatingNewAccount, setCreatingNewAccount] = useState(false);
    const from = location.state?.from?.pathname || '/';
    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('reactNotes-accessToken');
        const storedUser = JSON.parse(localStorage.getItem('reactNotes-user'));

        if (accessToken && storedUser) {
            dispatch(
                setState({
                    isAuthenticated: true,
                    firstName: storedUser.firstName,
                    lastName: storedUser.lastName,
                    username: storedUser.username,
                    profilePicture: storedUser.profilePicture,
                    email: storedUser.email,
                    isAdmin: storedUser.isAdmin,
                    userId: storedUser.userId,
                    accessToken: localStorage.getItem('reactNotes-accessToken'),
                    refreshToken: localStorage.getItem('reactNotes-refreshToken'),
                })
            );
        }
    }, [dispatch]);

    const signInWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;

            try {
                dispatch(setSpinnerMessage('Logging User'));
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const userInfo = await userInfoResponse.json();

                let newUser = {
                    firstName: userInfo.given_name,
                    lastName: userInfo.family_name,
                    username: userInfo.name,
                    password: undefined,
                    email: userInfo.email,
                    userId: userInfo.sub,
                    profilePicture: userInfo.picture,
                };
                let resp = await UserServices.checkUser(newUser);
                let user;
                let tokens;

                if (resp.data.exists === true) {
                    user = resp.data.user;
                    tokens = resp.data.tokens;
                } else {
                    let response = await UserServices.register(newUser);
                    user = response.data.user;
                    tokens = response.data.tokens;
                }
                localStorage.setItem('reactNotes-accessToken', tokens.accessToken);
                localStorage.setItem('reactNotes-refreshToken', tokens.refreshToken);
                localStorage.setItem('reactNotes-user', JSON.stringify(user));
                dispatch(
                    setState({
                        isAuthenticated: true,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        userId: user.userId,
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                    })
                );
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                dispatch(setSpinnerMessage(''));
            }
        },
    });

    const handleCreateAccount = async () => {
        dispatch(setSpinnerMessage('Creating User'));
        try {
            let response = await UserServices.register({ firstName, lastName, username, password, email });
            let user = response.data.user;
            let tokens = response.data.tokens;

            localStorage.setItem('reactNotes-accessToken', tokens.accessToken);
            localStorage.setItem('reactNotes-refreshToken', tokens.refreshToken);
            localStorage.setItem('reactNotes-user', JSON.stringify(user));

            dispatch(
                setState({
                    isAuthenticated: true,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userId: user.userId,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                })
            );
        } catch (error) {
            setEmailError('Email already exists.');
        } finally {
            dispatch(setSpinnerMessage(''));
        }
    };

    const handleLogin = async () => {
        try {
            dispatch(setSpinnerMessage('Logging User'));
            let response = await UserServices.login({ username, password });
            let user = response.data.user;
            let tokens = response.data.tokens;

            localStorage.setItem('reactNotes-accessToken', tokens.accessToken);
            localStorage.setItem('reactNotes-refreshToken', tokens.refreshToken);
            localStorage.setItem('reactNotes-user', JSON.stringify(user));

            dispatch(
                setState({
                    isAuthenticated: true,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userId: user.userId,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                })
            );
            navigate(from, { replace: true });
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                if (message === 'User with that username does not exist.') {
                    setUsernameError(message);
                    setPasswordError('');
                } else if (message === 'Invalid password. Try again.') {
                    setPasswordError(message);
                    setUsernameError('');
                }
            } else {
                console.error('Error logging in:', error);
            }
        } finally {
            dispatch(setSpinnerMessage(''));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isValid) {
            if (creatingNewAccount) {
                handleCreateAccount();
            } else {
                handleLogin();
            }
        }
    };

    const textInputFieldStyle = {
        '& .MuiInputBase-root': {
            color: 'white',
            backgroundColor: 'rgb(60,54,76)',
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(54, 48, 71)',
        },
    };
    const buttonStyle = {
        backgroundColor: 'rgb(109,84,181)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgb(93, 70, 161)',
        },
    };
    const checkFormInput = () => {
        if (creatingNewAccount) {
            const isFirstNameValid = firstName.trim() !== '';
            const isLastNameValid = lastName.trim() !== '';
            const isUsernameValid = username.trim() !== '';
            const isPasswordValid = password.trim() !== '';
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

            setIsValid(isFirstNameValid && isLastNameValid && isUsernameValid && isPasswordValid && isEmailValid);
        } else {
            const isUsernameValid = username.trim() !== '';
            const isPasswordValid = password.trim() !== '';

            setIsValid(isUsernameValid && isPasswordValid);
        }
    };
    useEffect(() => {
        checkFormInput();
    }, [firstName, lastName, username, password, email, creatingNewAccount]);
    
    return (
        <div className={styles['login-container']}>
            <div className={styles['sign-in-container']}>
                <div className={styles['sign-in-form']}>
                    <div style={{ fontSize: '50px', marginBottom: '10px' }}>{creatingNewAccount ? 'Create an Account' : 'Login into account'}</div>
                    <div>
                        {creatingNewAccount ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <span onClick={() => { setCreatingNewAccount((prev) => !prev); setPasswordError(''); setUsernameError(''); }} style={{ color: '#958BAE', textDecoration: 'underline', cursor: 'pointer' }}>
                            {creatingNewAccount ? 'Login' : 'Create Account'}
                        </span>
                    </div>

                    <div className={styles['sign-in-form-details']} onKeyDown={handleKeyDown}>
                        {creatingNewAccount && (
                            <div className={styles['sign-in-user-details']}>
                                <TextField value={firstName} onChange={(e) => setFirstName(e.target.value.trim())} id="firstNameInput" label="First Name" variant="outlined" sx={textInputFieldStyle} />
                                <TextField value={lastName} onChange={(e) => setLastName(e.target.value.trim())} id="lastNameInput" label="Last Name" variant="outlined" sx={textInputFieldStyle} />
                            </div>
                        )}

                        <TextField value={username} onChange={(e) => setUsername(e.target.value.trim())} id="usernameInput" label="Username" variant="outlined" sx={textInputFieldStyle} />
                        {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
                            id="passwordInput"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            sx={textInputFieldStyle}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                        {creatingNewAccount && <TextField value={email} onChange={(e) => setEmail(e.target.value.trim())} id="outlined-basic" label="email" variant="outlined" type="text" sx={textInputFieldStyle} />}
                        {creatingNewAccount && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                    </div>

                    <div className={styles['line-with-text']}>
                        <div className={styles['line']}></div>
                        <span>Or {creatingNewAccount ? 'register' : 'login'} with</span>
                        <div className={styles['line']}></div>
                    </div>

                    <div className={styles['company-logo-container']}>
                        <div className={styles['company-logo-div']} onClick={signInWithGoogle}>
                            {Icons.GOOGLE_LOGO}
                            <span style={{ marginLeft: '10px' }}>Google</span>
                        </div>
                        <div className={styles['company-logo-div']}>
                            {Icons.APPLE_LOGO}
                            <span style={{ marginLeft: '10px' }}>Apple</span>
                        </div>
                    </div>
                    <Button variant="contained" disabled={!isValid} onClick={creatingNewAccount ? handleCreateAccount : handleLogin} sx={buttonStyle}>
                        {creatingNewAccount ? 'Create Account' : 'Login'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;