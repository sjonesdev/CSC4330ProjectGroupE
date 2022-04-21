import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import APIRequestHandler from '../common/APIRequestHandler';

interface SignInProps {
    setSignedIn: Function
    signedIn: boolean
}
 
interface SignInState {
    setSignedIn: Function
    signedIn: boolean
    user: boolean
    error: any
    username: string
    password: string
}
 
class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = { 
            ...props,
            user: false,
            error: null,
            username: "",
            password: "",
        };
    }

    login(e: any) {
        return true;
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            let token = await APIRequestHandler.instance.login(this.state.username, this.state.password);
            this.setState({ signedIn: true });
            this.state.setSignedIn(true);
        } catch (error) {
            this.setState({ error });
            console.log(error);
        }
    }

    render() { 
        return (
            <div className="signin">
                {this.state.signedIn && <Navigate to="/" replace={true} />}
                <h1>Sign In</h1>
                {this.state.error ? <h4>Please Enter a Valid Username & Password</h4> : <></>}
                <form className='form' onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: event.target.value })} />

                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value })} />
                    
                    <input type="submit" className="submit" value="Sign In" />
                </form>
                <h3>Not a member? <Link to="/signup">Sign Up</Link></h3>
            </div>
        );
    }
}
 
export default SignIn;