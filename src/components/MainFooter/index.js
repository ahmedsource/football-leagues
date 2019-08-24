import React from 'react'
import './style.scss';
import {Grid, List, Flag, Icon} from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify';
class MainFooter extends React.PureComponent {
    
    render() {
        return(
            <React.Fragment>
                <Grid centered verticalAlign='middle' className='footer-down'>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={6} textAlign='center'>
                            <List horizontal>
                                <List.Item as='a'>About Us</List.Item>
                                <List.Item as='a'>Sitemap</List.Item>
                                <List.Item as='a'>Contact</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={2} textAlign='center'>
                            <Flag name='us' />
                            <span>English</span>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={4} textAlign='center'>
                            <List horizontal>
                                <List.Item as='a'><Icon as='i' circular size='large' name='facebook' color='grey' /></List.Item>
                                <List.Item as='a'><Icon as='i' circular size='large' name='twitter' color='grey' /></List.Item>
                                <List.Item as='a'><Icon as='i' circular size='large' name='youtube' color='grey' /></List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <ToastContainer position='top-right' />
            </React.Fragment>
        )
    }
}
export default MainFooter;