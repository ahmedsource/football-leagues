import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
class HomePage extends React.Component {
  state={

  }

  componentDidMount(){

  }


  render() {
    return(
      <React.Fragment>
          <b>home</b>
      </React.Fragment>
    )
  }
}
export default compose(withRouter)(HomePage);