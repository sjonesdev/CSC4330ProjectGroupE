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
                            Columbus List is a platform designed to let students from 
                            Columbus University advertise items they want to sell, 
                            look for items they want to buy, and organize transactions 
                            between each other for these items. With the support of 
                            university administration, our goal is to allow students to 
                            forego much of the hassle of shipping while maintaining accountability 
                            on both sides of the transaction.
                        </p>
                    </div>
                    <div className="team">
                        <h2>Meet the team</h2>
                        <div className="card-grid">
                            <div className="card-row">
                                <div className="card card--alt">
                                    <div className="photo-container">
                                        <img src="/img/SamuelJones.jpg" alt="Photo of Samuel Jones" className="photo" />
                                    </div>
                                    <h3 className="card-title">Samuel Jones</h3>
                                    <p>
                                        Team leader, front-end designer and developer
                                    </p>
                                </div>
                                <div className="card card--alt">
                                    <div className="photo-container">
                                        <img src="/img/KobeJohnson.jpg" alt="Photo of Kobe Johnson" className="photo" />
                                    </div>
                                    <h3 className="card-title">Kobe Johnson</h3>
                                    <p>
                                        Front-end developer, front-end test engineer
                                    </p>
                                </div>
                                <div className="card card--alt">
                                    <div className="photo-container">
                                        <img src="/img/MartinIvanchev.jpg" alt="Photo of Martin Ivanchev" className="photo" />
                                    </div>
                                    <h3 className="card-title">Martin Ivanchev</h3>
                                    <p>
                                        Back-end developer, database engineer
                                    </p>
                                </div>
                            </div>
                            <div className="card-row">
                                <div className="card card--alt">
                                    <div className="photo-container">
                                        <img src="/img/AbdulKabbani.jpg" alt="Photo of Abdul Kabbani" className="photo" />
                                    </div>
                                    <h3 className="card-title">Abdul Kabbani</h3>
                                    <p>
                                        Back-end developer, security engineer
                                    </p>
                                </div>
                                <div className="card card--alt">
                                    <div className="photo-container">
                                        <img src="/img/AdamKardorff.jpg" alt="Photo of Adam Kardorff" className="photo" />
                                    </div>
                                    <h3 className="card-title">Adam Kardorff</h3>
                                    <p>
                                        Back-end developer, security engineer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us" id="contact-us">
                        <h2>Contact Us</h2>
                        <ul>
                            <li>Email: example@columbus.edu</li>
                            <li>Phone: (999) 999-9999</li>
                            {/* <li>Use the form below</li> */}
                        </ul>
                        {/* <form className='form' action="" method="post">
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' />
                            <label htmlFor="res-email">Response Email</label>
                            <input type="email" id='res-email' />
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id='subject' />
                            <label htmlFor="msg">Message</label>
                            <input type="textarea" id="msg" />
                            <input type="submit" className='submit' value="Send" />
                        </form> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default About;