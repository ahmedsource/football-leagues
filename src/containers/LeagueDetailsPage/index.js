import React from 'react';
import { compose } from 'react-compose';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'
import { Container, Grid, Segment, Header, Divider, GridColumn } from 'semantic-ui-react'

import CompetitionBox from '../../components/CompetitionBox'
import TeamBox from '../../components/TeamBox'

class LeagueDetailsPage extends React.Component {

    state={
        competitionLoading: true,
        competition: null,
        teamsLoading: true,
        teams: []
    }

    componentDidMount(){
        const {league_id} = this.props.match.params
        this.getLeagueDetails(league_id)
        this.getLeagueTeams(league_id)
    }

    getLeagueDetails = (id) => {
        axios.get(`${footBallBaseUrl}/competitions/${id}`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data){
                const competition = response.data
                this.setState({competition, competitionLoading:false})
            }
        }).catch((error)=> {
            toast.error(error.message, {autoClose: 6000});
        })
    }

    getLeagueTeams = (id) => {
        axios.get(`${footBallBaseUrl}/competitions/${id}/teams`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data.teams.length > 0){
                const teams = response.data.teams
                this.setState({teams, teamsLoading:false})
            }
        }).catch((error)=> {
            toast.error(error.message, {autoClose: 6000});
        })
    }

    goToTeam = (id)=>{
        const {league_id} = this.props.match.params
        let redirectToTeam = `/leagues/${league_id}/teams/${id}`
        this.props.history.push({
            pathname: redirectToTeam,
            state:{areaName:this.state.competition.area.name, leagueName:this.state.competition.name}
        })
    }


    render() {
        return(
            <React.Fragment>
                <Container>
                    <Header textAlign='left' as='h1'>Football Leagues</Header>
                    <Segment loading={this.state.competitionLoading}>
                        {!!this.state.competitionLoading && <Divider section hidden/>}
                        {!!this.state.competition &&
                            <CompetitionBox  
                                id={this.state.competition.id} 
                                name={this.state.competition.name} 
                                areaName={this.state.competition.area.name}
                                startDate={this.state.competition.currentSeason.startDate}
                                endDate={this.state.competition.currentSeason.endDate}
                                goToLeague={false}
                            />
                        }
                    </Segment>
                    <Header textAlign='left' as='h1'>Teams</Header>
                    <Segment loading={this.state.teamsLoading}>
                        {!!this.state.teamsLoading && <Divider section hidden/>}
                        <Grid>
                            {this.state.teams && this.state.teams.map(team =>(
                                <GridColumn textAlign='left' mobile={16} tablet={16} computer={8} key={team.id}>
                                    <TeamBox 
                                        id={team.id} 
                                        name={team.name}
                                        address={team.address}
                                        email={team.email}
                                        website={team.website}
                                        crestUrl={team.crestUrl}
                                        goToTeam={()=>this.goToTeam(team.id)}
                                    />
                                </GridColumn>
                            ))}
                        </Grid>
                    </Segment>
                </Container>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(LeagueDetailsPage);