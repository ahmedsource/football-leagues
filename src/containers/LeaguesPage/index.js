import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
class LeaguesPage extends React.Component {

    state={

    }

    componentDidMount(){

    }


    render() {
        return(
            <React.Fragment>
                <b>leaguesPage</b>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(LeaguesPage);