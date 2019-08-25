import React from 'react';
import { Container, Grid, Segment, Header, Image, Icon, Flag, Divider, Button} from 'semantic-ui-react'
import axios from 'axios';
import {imageSearchUrl, imageSearchkey, leagueLogos} from '../../lib/constants'
import {mapFlagToAreaName} from '../../lib/helpers'

import './style.scss'
class CompetitionBox extends React.Component {
    state={
        imageLoading: true,
        image: null,
    }
  
    getImage = ()=>{
        if(leagueLogos[this.props.id]){
            const image = leagueLogos[this.props.id];
            this.setState({image, imageLoading:false})
        }else{
            axios.get(`${imageSearchUrl}/search`, { params: {
                'apikey': imageSearchkey,
                'num':1,
                'search_engine': 'google.com',
                'tbm':'isch',
                'q': `${this.props.name} logo`
            }}
            ).then(response => {
                console.log(response)
                if(response.data.image_results.length > 0){
                    const image = response.data.image_results[0].thumbnail
                    this.setState({image, imageLoading:false})
                }
            }).catch((error)=> {
                this.setState({imageLoading:false})
            })
        }
    }

    componentDidMount(){
        this.getImage()
    }
  
  
    render() {
      return(
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column verticalAlign='middle' textAlign='center' mobile={16} tablet={16} computer={4}>
                            {!!this.state.imageLoading&&
                                <Segment textAlign='center' compact basic loading={true}></Segment>
                            }
                            {!!this.state.image &&
                                <Image className='league-logo' centered src={this.state.image} size='tiny' />
                            }
                            {!this.state.imageLoading && !this.state.image &&
                                <Icon name='image outline' size='huge' />
                            }
                        </Grid.Column>
                        <Grid.Column textAlign='left' mobile={16} tablet={16} computer={6}>
                            <Header as='h3' textAlign='left'>
                                {this.props.name}
                            </Header>
                            <b>
                                <Flag name={mapFlagToAreaName(this.props.areaName)}/>
                                {this.props.areaName}
                            </b>
                            <Divider fitted hidden />
                            <Icon name='soccer' />
                            <small>{this.props.startDate}</small> - <small>{this.props.endDate}</small>
                        </Grid.Column>
                        {!!this.props.goToLeague &&
                            <Grid.Column verticalAlign='middle' textAlign='center' mobile={16} tablet={16} computer={6}>
                                <Button fluid basic onClick={this.props.goToLeague}> Details</Button>
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
            </Segment>
      )
    }
  }
  export default CompetitionBox;