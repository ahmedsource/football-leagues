import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
class TeamDetailsPage extends React.Component {

    state={

    }

    componentDidMount(){

    }


    render() {
        return(
            <React.Fragment>
                <b>team details</b>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(TeamDetailsPage);