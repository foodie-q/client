import React from 'react'
import AuthForm from './AuthForm'

const LoginForm = (props) => {
    return (
        <AuthForm
            buttonTitle="LOGIN"
            onButtonPress={props.login}
            loading={props.loading}
        />

     );
}

export default LoginForm;
