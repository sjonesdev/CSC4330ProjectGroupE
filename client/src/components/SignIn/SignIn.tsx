import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

interface SignInProps {
    setSignedIn: Function
    signedIn: boolean
}
 
interface SignInState {
    setSignedIn: Function
    signedIn: boolean
    user: boolean
    error: any
}
 
class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = { 
            ...props,
            user: false,
            error: null
        };
    }

    login(e: any) {
        return true;
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            let user = await this.login(event.target);
            this.setState({ user, signedIn: user });
            this.state.setSignedIn(user);
        } catch (error) {
            this.setState({ error });
        }
    }

    render() { 
        return (
            <div className="signin">
                {this.state.signedIn && <Navigate to="/" replace={true} />}
                <h1>Sign In</h1>
                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)} method="get">
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' />

                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" />
                    
                    <input type="submit" value="Sign In" />
                </form>
                <h3>Not a member? <Link to="/signup">Sign Up</Link></h3>
            </div>
        );
    }
}
 
export default SignIn;