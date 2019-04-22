import React from 'react'
import AuthForm from './AuthForm'

const LoginForm = (props) => {
    return ( 
        <AuthForm 
            buttonTitle="Login" 
            onButtonPress={props.login} />
        
     );
}
 
export default LoginForm;