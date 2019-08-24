import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Button, Ref, Container, Responsive, Modal, Divider } from 'semantic-ui-react';

import logo from './../../assets/logo.svg'
class MainHeader extends React.PureComponent {
    items = () => (
        <React.Fragment>
            <Menu.Item
                link
                as={Link} to={'/'}
            >
                <b>others</b>
            </Menu.Item>
        </React.Fragment>
    )
    render() {
        return (
            <React.Fragment>
                <Menu
                    size='large' 
                    fixed='top'
                    secondary
                    inverted
                    style={{backgroundColor: 'black'}}
                >
                    <Container>
                        <Menu.Item>
                            <Link to={'/'}>
                                <img alt="logo" style={{margin: 'auto', width: 'auto'}} src={logo} />
                            </Link>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Responsive as={React.Fragment} minWidth={768}>
                                {this.items()}
                            </Responsive>
                            <Responsive as={React.Fragment} maxWidth={767}>
                                <Modal
                                    dimmer='inverted' 
                                    trigger={<Menu.Item link icon="bars" />} 
                                    centered={false} basic size='small'
                                    style={{zIndex: '100', backgroundColor: '#fff'}}
                                >
                                    <Modal.Content>
                                        <Menu
                                            size='large' 
                                            secondary
                                            stackable
                                        >
                                            {this.items()}
                                        </Menu>
                                    </Modal.Content>
                                </Modal>
                            </Responsive>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Divider section hidden/>
            </React.Fragment>
        );
    }
}

export default compose(withRouter)(MainHeader);