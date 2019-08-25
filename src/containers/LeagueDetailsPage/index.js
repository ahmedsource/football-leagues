import React from 'react';
import { compose } from 'react-compose';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'
import { Container, Grid, Segment, Header, Divider } from 'semantic-ui-react'

import CompetitionBox from '../../components/CompetitionBox'

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
    }

    getLeagueDetails(id){
        axios.get(`${footBallBaseUrl}/competitions/${id}`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data){
                const competition = response.data
                console.log(competition)
                this.setState({competition, competitionLoading:false})
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
                    <Segment loading={this.state.competitionLoading}>
                        {this.state.competitionLoading && <Divider hidden/>}
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
                </Container>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(LeagueDetailsPage);