import * as React from 'react';

interface NotFoundProps {
    
}
 
interface NotFoundState {
    
}
 
class NotFound extends React.Component<NotFoundProps, NotFoundState> {
    constructor(props: NotFoundProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return (
            <div>
                <h1>Oops!</h1>
                <h2>Looks like this page is missing.</h2>
            </div>
        );
    }
}
 
export default NotFound;