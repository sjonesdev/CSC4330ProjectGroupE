import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import APIRequestHandler from '../common/APIRequestHandler';

interface SignUpProps {
    setSignedIn: Function
    signedIn: boolean
}

interface SignUpFormData {
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    phone: string
}
 
interface SignUpState {
    setSignedIn: Function
    signedIn: boolean
    user: boolean
    error: any
}
 
class SignUp extends React.Component<SignUpProps, SignUpState> {
    formData: SignUpFormData;
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            ...props,
            user: false,
            error: null,
        };
        this.formData = {
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            name: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createUser(e: any) {
        return true;
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.formData = {...this.formData, [event.target.name]: event.target.value};
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        try {
            let profInfo = {
                email: this.formData.email,
                name: this.formData.name,
                phone: this.formData.phone
            }
            if(this.formData.password === this.formData.confirmPassword) {
                let user = await APIRequestHandler.instance.createProfile(profInfo, this.formData.password);
                this.setState({ user, signedIn: user });
                this.state.setSignedIn(user);
            }
        } catch (error) {
            this.setState({ error });
        }
    }

    render() { 
        return (
            <div className="signup">
                {this.state.signedIn && <Navigate to="/" replace={true} />}
                <h1>Sign In</h1>
                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} />

                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" onChange={this.handleChange} />

                    <label htmlFor="phone">Phone</label>
                    <input type="phone" name="phone" id="phone" onChange={this.handleChange} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={this.handleChange} />
                    
                    <input type="submit" value="Sign Up" />
                </form>
                <h3>Already a member? <Link to="/signin">Sign In</Link></h3>
            </div>
        );
    }
}
 
export default SignUp;