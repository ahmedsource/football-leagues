import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'

import { Container, Grid, Segment, Header, Divider, GridColumn, Flag } from 'semantic-ui-react'

import TeamBox from '../../components/TeamBox'
import PlayerBox from '../../components/PlayerBox'

class TeamDetailsPage extends React.Component {

    state={
        teamLoading: true,
        team: null,
    }

    componentDidMount(){
        const {league_id, team_id} = this.props.match.params
        this.getTeamDetails(team_id)
    }

    getTeamDetails = (id)=>{
        axios.get(`${footBallBaseUrl}/teams/${id}`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data){
                const team = response.data
                this.setState({team, teamLoading:false})
            }
        }).catch((error)=> {
            toast.error(error.message, {autoClose: 6000});
        })
    }

    render() {
        return(
            <React.Fragment>
                <Container>
                    <Header textAlign='left' as='h1'>Football Leagues</Header>
                    <Segment loading={this.state.teamLoading}>
                        {!!this.state.teamLoading && <Divider section hidden/>}
                        {!!this.state.team &&
                            <TeamBox  
                                id={this.state.team.id} 
                                name={this.state.team.name}
                                address={this.state.team.address}
                                email={this.state.team.email}
                                website={this.state.team.website}
                                crestUrl={this.state.team.crestUrl}
                                goToTeam={false}
                            />
                        }
                    </Segment>
                    <Header textAlign='left' as='h1'>Squad</Header>
                    <Segment>
                        {!!this.state.team && !!this.state.team.squad.length> 0 &&
                            <Segment.Group stacked>
                                {this.state.team.squad.map(player =>(
                                    <PlayerBox
                                        key={player.id}
                                        name={player.name}
                                        nationality={player.nationality}
                                        position={player.position}
                                        role={player.role}
                                    />
                                ))}
                            </Segment.Group>
                        }
                    </Segment>
                </Container>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(TeamDetailsPage);