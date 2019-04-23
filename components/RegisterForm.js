import React from 'react'
import AuthRegister from './AuthRegister'

const RegisterForm = (props) => {
    return (
        <AuthRegister
            buttonTitle="REGISTER"
            onButtonPress={props.register}
            loading={props.loading}
        />

     );
}

export default RegisterForm;
