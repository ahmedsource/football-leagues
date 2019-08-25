import React from 'react';
import { Container, Grid, Segment, Header, Image, Icon, Flag, Divider, Button,List} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import './../style.scss'

import GameBox from '../../../components/GameBox'
class TeamGamesSection extends React.Component {
    state = {
        live: null,
        scheduled: [],
        showScheduledCount:4,
        finished: [],
        showFinishedCount:4,
    }
    componentDidMount(){
        const all_matches = this.props.matches
        const scheduled = all_matches.filter(function(element){return element.status === "SCHEDULED"})
        const finished = all_matches.filter(function(element){return element.status === "FINISHED"})
        const liveArray = all_matches.filter(function(element){return element.status === "IN_PLAY" || element.status === "PAUSED"})
        const live = liveArray.length>0 ? liveArray[0] : null 
        this.setState({scheduled, finished, live})
    } 
    render() {
      return(
            <React.Fragment>
                {!!this.state.live &&
                    <GameBox
                        team={this.props.team}
                        homeTeam={this.state.live.homeTeam} 
                        awayTeam={this.state.live.awayTeam} 
                        utcDate={this.state.live.utcDate}
                        status="Live" 
                    />
                }
                {!!this.state.finished &&
                    <React.Fragment>
                        <Header size='small' as='h3'>Finished Games</Header>
                        <Grid>
                            {this.state.finished.map((game,i) =>(
                                i<this.state.showFinishedCount ?
                                    <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8} key={game.id}>
                                        <GameBox
                                            team={this.props.team}
                                            homeTeam={game.homeTeam} 
                                            awayTeam={game.awayTeam}
                                            status="Finished" 
                                            utcDate={game.utcDate}
                                            score={game.score}
                                        />
                                    </Grid.Column>
                                :null
                            ))}
                        </Grid>
                    </React.Fragment>
                }
                {!!this.state.scheduled &&
                    <React.Fragment>
                        <Header size='small' as='h3'>Scheduled Games</Header>
                        <Grid>
                            {this.state.scheduled.map((game, i) =>(
                                i<this.state.showScheduledCount ?
                                    <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8} key={game.id}>
                                        <GameBox
                                            team={this.props.team}
                                            homeTeam={game.homeTeam} 
                                            awayTeam={game.awayTeam}
                                            status="Scheduled" 
                                            utcDate={game.utcDate} 
                                        />
                                    </Grid.Column>
                                : null
                            ))}
                        </Grid>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
  }
  export default TeamGamesSection;