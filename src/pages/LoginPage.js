import React, { useEffect, useState }  from 'react'; 
import styles from './styles/LoginPage.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setState } from '../redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import UserServices from '../UserServices';
import { setSpinnerMessage } from '../redux/dataSlice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

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
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate]);
    // Function to toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Prevent default behavior for mouse down on the eye icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
            const accessToken = localStorage.getItem("reactNotes-accessToken");
            const storedUser = JSON.parse(localStorage.getItem("reactNotes-user"));
        
            if (accessToken && storedUser) {
                dispatch(setState({
                    isAuthenticated: true,
                    firstName: storedUser.firstName,
                    lastName: storedUser.lastName,
                    username: storedUser.username,
                    profilePicture: storedUser.profilePicture,
                    email: storedUser.email,
                    isAdmin: storedUser.isAdmin,
                    userId: storedUser.userId,
                    accessToken: localStorage.getItem("reactNotes-accessToken"),
                    refreshToken: localStorage.getItem("reactNotes-refreshToken")
                }))
            }
        }, []);

    const signInWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // 1. Extract the access token
            const accessToken = tokenResponse.access_token;

            try {
                dispatch(setSpinnerMessage("Logging User"));
                // 2. Fetch user info from Google using the access token
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization header with the access token
                    },
                });
                // 3. Parse the JSON response
                const userInfo = await userInfoResponse.json();
    
                let newUser = {
                    firstName : userInfo.given_name,
                    lastName : userInfo.family_name,
                    username : userInfo.name,
                    password : undefined,
                    email: userInfo.email,
                    userId: userInfo.sub,
                    profilePicture: userInfo.picture
                }
                let resp = await UserServices.checkUser(newUser);
                let user;
                let tokens;

                if (resp.data.exists === true) {
                    user = resp.data.user;
                    tokens = resp.data.tokens;
                } else { // create a new user
                    let response = await UserServices.register(newUser);
                    user = response.data.user;
                    tokens = response.data.tokens;
                }
                // Store tokens in localStorage
                localStorage.setItem("reactNotes-accessToken", tokens.accessToken);
                localStorage.setItem("reactNotes-refreshToken", tokens.refreshToken);
                localStorage.setItem("reactNotes-user", JSON.stringify(user));
                dispatch(setState({
                    isAuthenticated: true,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userId: user.userId,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
                }))
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                dispatch(setSpinnerMessage(""));
            }
        },
    });

    const handleCreateAccount = async () => {
        // dispatch(setIsAuthenticated(true))
        dispatch(setSpinnerMessage("Creating User"));
        let response = await UserServices.register({ firstName, lastName, username, password, email});
        let user = response.data.user;
        let tokens = response.data.tokens;

        // Store tokens in localStorage
        localStorage.setItem("reactNotes-accessToken", tokens.accessToken);
        localStorage.setItem("reactNotes-refreshToken", tokens.refreshToken);
        localStorage.setItem("reactNotes-user", JSON.stringify(user));

        dispatch(setState({ // When isAuthenticated is set to true there is a useEffect that will redirect to dashboard
            isAuthenticated: true,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            userId: user.userId,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }));
        dispatch(setSpinnerMessage(""));
    }
    const handleLogin = async () => {
        try {
            dispatch(setSpinnerMessage("Logging User"));
            let response = await UserServices.login({ username, password });
            let user = response.data.user;
            let tokens = response.data.tokens;

            // Store tokens in localStorage
            localStorage.setItem("reactNotes-accessToken", tokens.accessToken);
            localStorage.setItem("reactNotes-refreshToken", tokens.refreshToken);
            localStorage.setItem("reactNotes-user", JSON.stringify(user));
            
            dispatch(setState({ // When isAuthenticated is set to true there is a useEffect that will redirect to dashboard
                isAuthenticated: true,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                userId: user.userId,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }))
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            dispatch(setSpinnerMessage(""));
        }
    }

    const googleLogoSVG = <svg width="50px" height="50px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
    const appleLogoSVG = <svg width="50px" height="50px"  viewBox="-56.24 0 608.728 608.728" xmlns="http://www.w3.org/2000/svg"><path d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z" fill="white"/></svg>
    
    const textInputFieldStyle = {
        '& .MuiInputBase-root': {
            color: 'white', // Text input color
            backgroundColor: 'rgb(60,54,76)', // Background color
          },
          '& .MuiInputLabel-root': {
            color: 'white', // Label color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none', // Border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(54, 48, 71)', // Hover border color
          },
    }
    const buttonStyle = {
        backgroundColor: 'rgb(109,84,181)',        // Background color
        color: 'white',                 // Text color
        '&:hover': {
          backgroundColor: 'rgb(93, 70, 161)',  // Hover background color
        },
    }
    useEffect(() => {
        checkFormInput();
      }, [firstName, lastName, username, password, email, creatingNewAccount]);
    const checkFormInput = () => {
        if (creatingNewAccount) {
          // Validate fields for creating a new account
          const isFirstNameValid = firstName.trim() !== "";
          const isLastNameValid = lastName.trim() !== "";
          const isUsernameValid = username.trim() !== "";
          const isPasswordValid = password.trim() !== "";
          const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); // Basic email validation
      
          // Enable the button only if all fields are valid
          setIsValid(isFirstNameValid && isLastNameValid && isUsernameValid && isPasswordValid && isEmailValid);
        } else {
          // Validate fields for logging in
          const isUsernameValid = username.trim() !== "";
          const isPasswordValid = password.trim() !== "";
      
          // Enable the button only if both fields are valid
          setIsValid(isUsernameValid && isPasswordValid);
        }
      };
    return (
        <div className={styles["login-container"]}>
            {/* <div style={{backgroundColor:"blue"}}>
                Hello
            </div> */}

            <div className={styles["sign-in-container"]}>
                <div className={styles["sign-in-form"]}>
                    <div style={{ fontSize: "50px", marginBottom: "10px" }}>{ creatingNewAccount?"Create an Account" : "Login into account"}</div>
                    <div>{ creatingNewAccount? "Already have an account?": "Don't have an account?"} <span onClick={() => setCreatingNewAccount(prev => !prev)} style={{ color: "#958BAE", textDecoration: "underline", cursor: "pointer" }}>{creatingNewAccount? "Login":"Create Account" }</span></div>

                    <div className={styles["sign-in-form-details"]}>
                        {creatingNewAccount &&
                            <div className={styles["sign-in-user-details"]}>
                                <TextField value={firstName} onChange={(e) => setFirstName(e.target.value.trim())} id="outlined-basic" label="First Name" variant="outlined" sx={textInputFieldStyle}/>
                                <TextField value={lastName} onChange={(e) => setLastName(e.target.value.trim())} id="outlined-basic" label="Last Name" variant="outlined" sx={textInputFieldStyle}/>
                            </div>
                        }
                        
                        <TextField value={username} onChange={(e) => setUsername(e.target.value.trim())} id="outlined-basic" label="Username" variant="outlined" sx={textInputFieldStyle}/>
                        <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
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
                      {showPassword ? <VisibilityOff sx={{ color: 'white' }}/> : <Visibility sx={{ color: 'white' }}/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
                        { creatingNewAccount &&  <TextField value={email} onChange={(e) => setEmail(e.target.value.trim())}id="outlined-basic" label="email" variant="outlined" type='text'sx={textInputFieldStyle}/>}
                    </div>

                    
                    <div className={styles["line-with-text"]}>
                        <div className={styles["line"]}></div>
                        <span>Or { creatingNewAccount? "register": "login" } with</span>
                        <div className={styles["line"]}></div>
                    </div>

                    <div className={styles["company-logo-container"]}>
                        <div className={styles["company-logo-div"]} onClick={signInWithGoogle}>
                            {googleLogoSVG}
                            <span style={{marginLeft:"10px"}}>Google</span>                            
                        </div>
                        <div className={styles["company-logo-div"]}>
                            {appleLogoSVG}
                            <span style={{marginLeft:"10px"}}>Apple</span>
                        </div>
                    </div>
                    <Button variant="contained" disabled={!isValid} onClick={creatingNewAccount ? handleCreateAccount: handleLogin} sx={buttonStyle}>{ creatingNewAccount? "Create Account" : "Login"}</Button>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;