import * as React from 'react';
import { Component } from 'react';
import { Mission } from 'src/Data/Types';
import { WithStyles, withStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export interface Props {
  mission: Mission
}

export interface Dispatches {
  setMission(mission: Mission): void
}

const styles = {
  root: {
    display: 'flex'
  },
  formControl: {

  }
};

class MissionSelectComponent extends Component<Props & Dispatches & WithStyles<typeof styles>> {

  readonly onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;

  constructor(props: Props & Dispatches & WithStyles<typeof styles>) {
    super(props);
    this.onChange = (ev) => {
      props.setMission(ev.target.value as Mission);
    }
  }

  render() {
    return (
      <form className={this.props.classes.root} autoComplete="off">
        <FormControl className={this.props.classes.formControl}>
          <InputLabel htmlFor="mission-simple">Mission</InputLabel>
          <Select
            value={this.props.mission}
            inputProps={{
              name: 'mission',
              id: 'mission-simple'
            }}
            onChange={this.onChange}
          >
             <MenuItem value={'intercept' as Mission}>Intercept</MenuItem>
             <MenuItem value={'assault' as Mission}>Assault</MenuItem>
             <MenuItem value={'transport' as Mission}>Transport</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(MissionSelectComponent);