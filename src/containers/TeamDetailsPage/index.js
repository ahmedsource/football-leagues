import React from 'react';
import { compose } from 'react-compose';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'

import { Container, Segment, Header, Divider } from 'semantic-ui-react'

import TeamBox from '../../components/TeamBox'
import PlayerBox from '../../components/PlayerBox'
import TeamGamesSection from './TeamGamesSection'
class TeamDetailsPage extends React.Component {

    state={
        teamLoading: true,
        team: null,
        matchesLoading: true,
        matches:[],
    }

    componentDidMount(){
        const {league_id, team_id} = this.props.match.params
        this.getTeamDetails(team_id)
        this.getTeamMatches(league_id, team_id)
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

    getTeamMatches = (league_id, team_id) => {
        axios.get(`${footBallBaseUrl}/competitions/${league_id}/matches`, { 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data){
                const all_matches = response.data.matches
                let matches = []
                for (var i = 0; i < all_matches.length; i++) {
                    if (String(all_matches[i].homeTeam.id) === String(team_id) || String(all_matches[i].awayTeam.id) === String(team_id)){
                        matches.push(all_matches[i])
                    }
                }
                this.setState({matches, matchesLoading:false})
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

                    <Header textAlign='left' as='h1'>Games</Header>
                    <Segment loading={this.state.matchesLoading}>
                        {!!this.state.matchesLoading && <Divider section hidden/>}
                        {!!this.state.matches && !!this.state.matches.length> 0 &&
                            <TeamGamesSection team={this.state.team}  matches={this.state.matches}/>
                        }
                    </Segment>

                    <Header textAlign='left' as='h1'>Squad</Header>
                    <Segment loading={this.state.teamLoading}>
                        {!!this.state.teamLoading && <Divider section hidden/>}
                        {!!this.state.team && !!this.state.team.squad && !!this.state.team.squad.length> 0 &&
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