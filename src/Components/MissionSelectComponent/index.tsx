import { Lens } from 'monocle-ts';
import { Dispatch, Action } from 'redux';
import { Mission, AppState } from 'src/Data/Types';
import MissionSelectComponent, { Props, Dispatches } from './component';
import { update } from 'src/Data/Action';
import { connect } from 'react-redux';

export interface OwnProps<S> {
  lens: Lens<S, Mission>
}

function mapStateToProps<S>(state: S, ownProps: OwnProps<S>): Props {
  return {
    mission: ownProps.lens.get(state)
  };
}

function mapDispatchToProps<S>(dispatch: Dispatch<Action>, ownProps: OwnProps<S>): Dispatches {
  return {
    setMission(m: Mission) {
      dispatch(update(ownProps.lens.set(m)));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissionSelectComponent);