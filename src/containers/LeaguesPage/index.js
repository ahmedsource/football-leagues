import React from 'react';
import { compose } from 'react-compose';
import { withRouter} from 'react-router-dom';
import {Container, Segment, Header, Divider} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import {footBallBaseUrl, footBallBasekey} from '../../lib/constants'

import CompetitionBox from '../../components/CompetitionBox'
class LeaguesPage extends React.Component {

    state={
        loading: true,
        competitions: []
    }

    componentDidMount(){
        axios.get(`${footBallBaseUrl}/competitions`, { 
            params: {'plan': 'TIER_ONE'}, 
            headers:{"X-Auth-Token": footBallBasekey}
        }).then(response => {
            if(response.data.competitions.length > 0){
                const competitions = response.data.competitions
                this.setState({competitions, loading:false})
            }
        }).catch((error)=> {
            toast.error(error.message, {autoClose: 6000});
        })
    }

    goToLeague = (id)=>{
        let redirectToLeague = `/leagues/${id}`
        this.props.history.push({
            pathname: redirectToLeague,
            state:{}
        })
    }


    render() {
        return(
            <React.Fragment>
                <Container>
                    <Header textAlign='left' as='h1'>Football Leagues</Header>
                    <Segment loading={this.state.loading}>
                        {this.state.loading && <Divider hidden/>}
                        {this.state.competitions && this.state.competitions.map(competition =>(
                            <CompetitionBox 
                                key={competition.id} 
                                id={competition.id} 
                                name={competition.name} 
                                areaName={competition.area.name}
                                startDate={competition.currentSeason.startDate}
                                endDate={competition.currentSeason.endDate}
                                goToLeague={()=>this.goToLeague(competition.id)}
                            />
                        ))}
                    </Segment>
                </Container>
            </React.Fragment>
        )
    }
}
export default compose(withRouter)(LeaguesPage);