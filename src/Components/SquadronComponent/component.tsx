import * as React from 'react';
import { Component } from 'react';
import { Lens } from "monocle-ts";
import { Squadron, Mission, AppState, mission, sorties, commander, pilots, unsafeIndex } from 'src/Data/Types';
import { Card, WithStyles, CardContent, withStyles, Typography, Button } from '@material-ui/core';
import MissionSelectComponent from '../MissionSelectComponent';
import NumberComponent from '../NumberComponent';
import PilotComponent from '../PilotComponent';
import { range } from 'ramda';

export interface Props<S> {
  squadron: Squadron,
  lens: Lens<S, Squadron>
};

export interface Dispatches {
  setMission(mission: Mission): void
  groupKill(): void
  resetKills(): void
}

const styles = {
  card: {
    marginTop: "2px",
    marginBottom: "2px",
    minWidth: 275,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "8px"
  }
}

class SquadronComponent extends Component<Props<AppState> & Dispatches & WithStyles<typeof styles>> {
  render() {
    return (
      <div>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography variant="headline">{this.props.squadron.name}</Typography>
            <MissionSelectComponent lens={this.props.lens.compose(mission)} />
            <NumberComponent lens={this.props.lens.compose(sorties)} label="Sorties" />
            <Button onClick={this.props.groupKill}>Group Kill</Button>
            <Button onClick={this.props.resetKills}>Reset Kills</Button>
          </CardContent>
          <div style={{margin: "8x"}}>
            Commander:
            <PilotComponent key={`pilot-${this.props.squadron.name}-commander`} lens={this.props.lens.compose(commander) } />
          </div>
          {range(0, this.props.squadron.pilots.length).map((i: number) => (
            <div key={`pilot-container-${this.props.squadron.name}-${i}`} style={{margin: "8x"}}>
              <PilotComponent key={`pilot-component-${this.props.squadron.name}-${i}`} containerLens={this.props.lens.compose(pilots)} lens={this.props.lens.compose(pilots).compose(unsafeIndex(i))} />
            </div>
          ))}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SquadronComponent);