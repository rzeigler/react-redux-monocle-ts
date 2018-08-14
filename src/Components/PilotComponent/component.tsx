
import * as React from 'react';
import { Component } from 'react';
import { Pilot, AppState, kills } from 'src/Data/Types';
import { Lens } from 'monocle-ts';
import NumberComponent from '../NumberComponent';
import { Button } from '@material-ui/core';

export interface Props<S> {
  lens: Lens<S, Pilot>;
  pilot: Pilot
}

export interface Dispatches {
  kiaed(self: Pilot): void
}

class PilotComponent extends Component<Props<AppState> & Dispatches> {
  render() {
    const onKiaed = () => {
      this.props.kiaed(this.props.pilot);
    }
    return (
      <div style={{display: "flex"}}>
        <div style={{flexGrow: 1}}>{this.props.pilot.callsign}</div> <div><NumberComponent label="kills" lens={this.props.lens.compose(kills)} /></div> <div><Button onClick={onKiaed}>KIA</Button></div>
      </div>
    )
  }
}

export default PilotComponent;