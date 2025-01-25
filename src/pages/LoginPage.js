import React from 'react'; 
import styles from './styles/LoginPage.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const LoginPage = (props) => {
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
    return (
        <div className={styles["login-container"]}>
            <div style={{backgroundColor:"blue"}}>
                Hello
            </div>

            <div className={styles["sign-in-container"]}>
                <div className={styles["sign-in-form"]}>
                    <div style={{fontSize:"50px", marginBottom:"10px"}}>Create an Account</div>
                    <div>Already have an account? Login</div>

                    <div className={styles["sign-in-form-details"]}>
                        <div className={styles["sign-in-user-details"]}>
                            <TextField id="outlined-basic" label="First Name" variant="outlined" sx={textInputFieldStyle}/>
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={textInputFieldStyle}/>
                        </div>
                        <TextField id="outlined-basic" label="Username" variant="outlined" sx={textInputFieldStyle}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type='password'sx={textInputFieldStyle}/>
                    </div>

                    
                    <div className={styles["line-with-text"]}>
                        <div className={styles["line"]}></div>
                        <span>Or register with</span>
                        <div className={styles["line"]}></div>
                    </div>

                    <div className={styles["company-logo-container"]}>
                        <div className={styles["company-logo-div"]}>
                            {googleLogoSVG}
                            <span style={{marginLeft:"10px"}}>Google</span>
                        </div>
                        <div className={styles["company-logo-div"]}>
                            {appleLogoSVG}
                            <span style={{marginLeft:"10px"}}>Apple</span>
                        </div>
                    </div>

                    <Button variant="contained" sx={buttonStyle}>Create Account</Button>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;