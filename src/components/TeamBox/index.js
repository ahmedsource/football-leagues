import React from 'react';
import {Grid, Segment, Header, Image, Icon, List, Flag} from 'semantic-ui-react'
import './style.scss'

import {mapFlagToAreaName} from '../../lib/helpers'
class TeamBox extends React.Component {  
    render() {
      return(
            <Segment color='green' className='col-min-height'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column 
                            verticalAlign='middle' 
                            textAlign='center' mobile={16} tablet={16} computer={4}  
                            onClick={this.props.goToTeam ? this.props.goToTeam : null} 
                            className={this.props.goToTeam ? 'pointer' : ''}
                        >
                            {!!this.props.crestUrl && this.props.crestUrl.length >0 ?
                                <Image className='league-logo' centered src={this.props.crestUrl} size='tiny' />
                            :
                                <Icon name='image outline' size='huge' />
                            }
                        </Grid.Column>
                        <Grid.Column textAlign='left' mobile={16} tablet={16} computer={12}>
                            <Header as='h3' 
                                textAlign='left' 
                                onClick={this.props.goToTeam ? this.props.goToTeam : null} 
                                className={this.props.goToTeam ? 'pointer' : ''}>
                                {this.props.name}
                            </Header>
                            <List>
                                {!!this.props.area &&
                                    <List.Item>
                                        <Flag name={mapFlagToAreaName(this.props.area)}/>
                                        {this.props.area}
                                    </List.Item>
                                }
                                <List.Item>
                                    <List.Icon name='marker' />
                                    <List.Content>
                                        {this.props.address}
                                    </List.Content>
                                </List.Item>
                                {!!this.props.email &&
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>
                                            <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
                                        </List.Content>
                                    </List.Item>
                                }
                                <List.Item>
                                    <List.Icon name='linkify' />
                                    <List.Content>
                                        <a href={this.props.website} target='blank'>{this.props.website}</a>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
      )
    }
  }
  export default TeamBox;