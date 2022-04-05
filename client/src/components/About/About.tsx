import * as React from 'react';
 
interface AboutProps {
    
}
 
interface AboutState {
    
}
 
class About extends React.Component<AboutProps, AboutState> {
    constructor(props: AboutProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return (
            <div className="content-container">
                <div className="about">
                    <div className="product">
                        <h2>About Columbus List</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatum quod ex? Aliquid maxime tenetur rerum reprehenderit nihil porro hic neque cumque. Aspernatur vitae illum itaque magni numquam ab natus.
                        </p>
                    </div>
                    <div className="team">
                        <h2>Meet the team</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio atque omnis libero deserunt. Blanditiis ipsa libero perspiciatis non expedita aut doloribus magni reprehenderit repellat, voluptas eaque recusandae ex eveniet aspernatur.
                        </p>
                    </div>
                    <div className="contact-us" id="contact-us">
                        <h2>Contact Us</h2>
                        <ul>
                            <li>Email: example@columbus.edu</li>
                            <li>Phone: (999) 999-9999</li>
                            <li>Use the form below</li>
                        </ul>
                        <form className='form' action="" method="post">
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' />
                            <label htmlFor="res-email">Response Email</label>
                            <input type="email" id='res-email' />
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id='subject' />
                            <label htmlFor="msg">Message</label>
                            <input type="textarea" id="msg" />
                            <input type="submit" className='submit' value="Send" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default About;