import React from 'react'
import AuthRegister from './AuthRegister'

const RegisterForm = (props) => {
    return ( 
        <AuthRegister 
            buttonTitle="Register" 
            onButtonPress={props.register} />
        
     );
}
 
export default RegisterForm;