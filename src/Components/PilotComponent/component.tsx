
import * as React from 'react';
import { Component } from 'react';
import { Pilot, AppState, kills } from 'src/Data/Types';
import { Lens } from 'monocle-ts';
import NumberComponent from '../NumberComponent';

export interface Props<S> {
  lens: Lens<S, Pilot>;
  pilot: Pilot
}

class PilotComponent extends Component<Props<AppState>> {
  render() {
    return (
      <div>
        {this.props.pilot.callsign} <NumberComponent label="kills" lens={this.props.lens.compose(kills)} />
      </div>
    )
  }
}

export default PilotComponent;