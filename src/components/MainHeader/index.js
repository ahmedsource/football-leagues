import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Button, Ref, Container, Responsive, Modal, Divider, Icon } from 'semantic-ui-react';

import './style.scss';
class MainHeader extends React.PureComponent {
    items = () => (
        <React.Fragment>
            <Menu.Item
                link
                as={Link} to={'/leagues'}
            >
                <b>Leagues</b>
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
                    className="header-up"
                >
                    <Container>
                        <Menu.Item>
                            <Link to={'/'}>
                                <Icon inverted style={{margin: 'auto', width: 'auto'}} name='soccer' size='huge' />
                                &nbsp;
                                <h4 className='logo-title'>FootballApp</h4>
                            </Link>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Responsive as={React.Fragment} minWidth={768}>
                                {this.items()}
                            </Responsive>
                            <Responsive as={React.Fragment} maxWidth={767}>
                                <Modal
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
                <Divider section hidden/>
                <Divider section hidden/>
            </React.Fragment>
        );
    }
}

export default compose(withRouter)(MainHeader);