import React from 'react'
import './style.scss';
import {Grid, Flag, Icon, Divider} from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify';
class MainFooter extends React.PureComponent {
    
    render() {
        return(
            <React.Fragment>
                <Divider section hidden />
                <Grid centered verticalAlign='middle' className='footer-down'>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={4} textAlign='center'>
                            {/* <Icon inverted name='soccer' /> */}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={4} textAlign='center'>
                        <Flag name='us' />
                            <b className='white-text'>English</b>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={4} textAlign='center'>
                            <Icon inverted name="copyright outline" />
                            <b className='white-text'>copyright reserved to Football App</b>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <ToastContainer position='top-right' />
            </React.Fragment>
        )
    }
}
export default MainFooter;