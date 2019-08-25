import React from 'react';
import { Container, Grid, Segment, Header, Image, Icon, Flag, Divider, Button} from 'semantic-ui-react'
import axios from 'axios';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'
import {formatDate} from '../../lib/helpers'
import { toast } from 'react-toastify';

import './style.scss'
class CompetitionBox extends React.Component {
    state={
        homeTeamImageLoading: true,
        awayTeamImageLoading: true,
        homeTeamImage: null,
        awayTeamImage: null,
    }
  

    componentDidMount(){
        // if team is cashed dont rerequest
        if(this.props.team.id===this.props.homeTeam.id){
            this.setState({homeTeamImage:this.props.team.crestUrl, homeTeamImageLoading:false})
            this.getTeamImage(this.props.awayTeam.id, false)
        }
        else if(this.props.team.id===this.props.awayTeam.id){
            this.setState({awayTeamImage:this.props.team.crestUrl, awayTeamImageLoading:false})
            this.getTeamImage(this.props.homeTeam.id, true)
        }
    }
    
    getTeamImage = (id, isHome) =>{
        console.log("axios")
        axios.get(`${footBallBaseUrl}/teams/${id}`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data){
                const team = response.data
                console.log(team)
                isHome ?
                    this.setState({homeTeamImage:team.crestUrl, homeTeamImageLoading:false})
                :
                    this.setState({awayTeamImage:team.crestUrl, awayTeamImageLoading:false})
            }
        }).catch((error)=> {
            toast.error(error.message, {autoClose: 4000});
            this.setState({homeTeamImageLoading: false, awayTeamImageLoading:false})
        })

    }
  
    render() {
      return(
            <Segment className="min-height-game-box">
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column verticalAlign='middle' textAlign='center' mobile={4} tablet={4} computer={4}>
                            <Segment compact basic loading={this.state.homeTeamImageLoading}>
                                {!!this.state.homeTeamImage &&
                                    <Image className='league-logo' centered src={this.state.homeTeamImage} size='tiny' />
                                }
                                {!this.state.homeTeamImageLoading && !this.state.homeTeamImage &&
                                    <Icon name='image outline' size='huge' />
                                }
                                <b size='small'>{this.props.homeTeam.name}</b>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle' mobile={4} tablet={4} computer={4}>
                            {this.props.status ==='Scheduled' &&
                                <React.Fragment>
                                    <Header size='small'>{this.props.status}</Header>
                                    {formatDate(this.props.utcDate)}
                                </React.Fragment>
                            }
                            {this.props.status ==='Finished' &&
                                <React.Fragment>
                                    <b>{this.props.score.fullTime.homeTeam}</b>  :  <b>{this.props.score.fullTime.awayTeam}</b>
                                </React.Fragment>
                            }
                            {this.props.status ==='Live' &&
                                <React.Fragment>
                                    <b>Live</b>
                                </React.Fragment>
                            }
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle' mobile={4} tablet={4} computer={4}>
                            <Segment compact basic loading={this.state.awayTeamImageLoading}>
                                {!!this.state.awayTeamImage &&
                                    <Image className='league-logo' centered src={this.state.awayTeamImage} size='tiny' />
                                }
                                {!this.state.awayTeamImage && !this.state.awayTeamImage &&
                                    <Icon name='image outline' size='huge' />
                                }
                                <b size='small'>{this.props.awayTeam.name}</b>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
      )
    }
  }
  export default CompetitionBox;