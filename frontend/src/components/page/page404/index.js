import { Button } from '@material-ui/core';
import React from 'react'
import { withRouter } from "react-router-dom";
import './index.scss'
class Page404 extends React.Component {
    render() {
        return (
            <div className="page-content">
                <div className="page-header">
                    <h1 className="align-self-center">404 Page not found</h1>
                </div>
                <div className='content'>
                    <Button 
                        className='back-button'
                        type="submit"
                        variant="contained"
                        onClick={() => this.props.history.push("/dashboard")}
                    >Back to home page
                    </Button>
                </div>
            </div>
        );
    }
}
export default withRouter(Page404)