import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';

interface SignUpProps {
    setSignedIn: Function
    signedIn: boolean
}
 
interface SignUpState {
    setSignedIn: Function
    signedIn: boolean
    user: boolean
    error: any
}
 
class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            ...props,
            user: false,
            error: null
        };
    }

    createUser(e: any) {
        return true;
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        try {
            let user = await this.createUser(event.target);
            this.setState({ user, signedIn: user });
            this.state.setSignedIn(user);
        } catch (error) {
            this.setState({ error });
        }
    }

    render() { 
        return (
            <div className="signup">
                {this.state.signedIn && <Navigate to="/" replace={true} />}
                <h1>Sign In</h1>
                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)} method="get">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />

                    <label htmlFor="pass">Password</label>
                    <input type="password" name="pass" />
                    
                    <label htmlFor="confirm-pass">Confirm Password</label>
                    <input type="password" name="confirm-pass" />
                    
                    <input type="submit" value="Sign Up" />
                </form>
                <h3>Already a member? <Link to="/signin">Sign In</Link></h3>
            </div>
        );
    }
}
 
export default SignUp;