import * as React from 'react';
import { Component } from 'react';
import { Lens } from 'monocle-ts';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { range } from 'ramda';
import { Squadron, AppState, unsafeIndex } from 'src/Data/Types';
import SquadronComponent from '../SquadronComponent';
import './App.css';


export interface Props<S> {
  squadronsLens: Lens<S, ReadonlyArray<Squadron>>;
  squadrons: ReadonlyArray<Squadron>;
}

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App<S> extends Component<Props<S> & WithStyles<typeof styles>> {
  render() {
    const childLenses = range(0, this.props.squadrons.length)
      .map(i => unsafeIndex<Squadron>(i));
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">Galactica Flight Room</Typography>
          </Toolbar>
        </AppBar>
        {childLenses.map((lens, i) => (
          <SquadronComponent key={`squadron-${i}`} lens={this.props.squadronsLens.compose(lens)}/>
        ))}
      </div>
    );
  }
};

export default withStyles(styles)(App);
