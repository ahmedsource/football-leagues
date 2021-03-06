import React from 'react';
import {Grid, Segment, Flag, Label} from 'semantic-ui-react'
import {mapFlagToAreaName, mapPositionToColor} from '../../lib/helpers'

import './style.scss'
class PlayerBox extends React.Component {  
    render() {
      return(
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column  verticalAlign='middle' mobile={16} tablet={16} computer={4}>
                            {this.props.name}
                        </Grid.Column>
                        <Grid.Column  verticalAlign='middle' mobile={16} tablet={16} computer={4}>
                            <Flag name={mapFlagToAreaName(this.props.nationality)} />
                            {this.props.nationality}
                        </Grid.Column>
                        <Grid.Column  verticalAlign='middle' mobile={16} tablet={16} computer={4}>
                            <Label circular 
                                size='mini' 
                                color={mapPositionToColor(this.props.position || this.props.role)}
                            />
                            &nbsp; &nbsp;
                            {this.props.position || this.props.role.toLowerCase()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
      )
    }
  }
  export default PlayerBox;