import PilotComponent, { Props } from './component';
import { Lens } from 'monocle-ts';
import { Pilot, AppState } from 'src/Data/Types';
import { connect } from 'react-redux';

export interface OwnProps<S> {
  lens: Lens<S, Pilot>
}

function mapStateToProps(state: AppState, ownProps: OwnProps<AppState>): Props<AppState> {
  return {
    ...ownProps,
    pilot: ownProps.lens.get(state)
  };
}

export default connect(mapStateToProps)(PilotComponent);