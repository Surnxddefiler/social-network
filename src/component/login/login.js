import style from './login.module.css'
import {Field, Form } from 'react-final-form'
import {requiredField} from "../../validators/validators";
import { connect } from 'react-redux';
import { loginThunk, logoutThunk} from '../../redux/auth-reducer.ts';
import { Navigate } from 'react-router-dom';

const LoginForm = (props) => {
    return (
        <Form onSubmit={(obj)=>{props.onSubmit(obj)}}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field validate={requiredField} name='email'>
                        {({input, meta}) =>(
                            <div>
                            <input type="text" placeholder="login" {...input} />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field validate={requiredField} name='password'>
                        {({input, meta}) =>(
                            <div>
                            <input type="password" placeholder="password" {...input} />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <button>login</button>
                </form>
            )
            }
        </Form>
        // <form className={style.form}>
        //     <input type="text" placeholder="login" />
        //     <input type="password" placeholder="password" />
        //     <div><input type="checkbox" /> remember</div>
        //     <button>login</button>
        // </form>
    )
}
const Login = (props) => {
    const onSubmit=(formData)=>{
        props.loginThunk(formData.email, formData.password)
        console.log(formData)
    }
    if(props.isAuth){// когда залогинились будет редиректстать
        return<Navigate to={"/profile"} />
    }
    return (
        <div className={style.login}>
            <h1>Login</h1>
            <LoginForm  onSubmit={onSubmit} />
        </div>
    )
}
const stateProps=(state)=>({
    isAuth: state.auth.isAuth
})
export default connect(stateProps, {loginThunk}) (Login)