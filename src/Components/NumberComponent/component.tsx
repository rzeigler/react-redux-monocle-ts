import * as React from 'react';
import { Component } from 'react';
import { WithStyles, withStyles, Button } from '@material-ui/core';

export interface Props {
  label: string;
  value: number;
}

export interface Dispatches {
  increment(): void;
  decrement(): void;
}

const style = {

}

class NumberComponent extends Component<Props & Dispatches & WithStyles<typeof style>> {

  render() {
    return (
      <div>
        <span>{this.props.label}: {this.props.value}</span>
        <Button onClick={this.props.increment}>
          +
        </Button>
        <Button onClick={this.props.decrement}>
          -
        </Button>
      </div>
    )
  }
}

export default withStyles(style)(NumberComponent);