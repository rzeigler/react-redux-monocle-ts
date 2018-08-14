import PilotComponent, { Props, Dispatches } from './component';
import { Lens } from 'monocle-ts';
import { Pilot, AppState } from 'src/Data/Types';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { update } from '../../Data/Action';
import { filter } from 'fp-ts/lib/Array';

export interface OwnProps<S> {
  lens: Lens<S, Pilot>,
  containerLens?: Lens<S, ReadonlyArray<Pilot>>
}

function mapStateToProps(state: AppState, ownProps: OwnProps<AppState>): Props<AppState> {
  return {
    lens: ownProps.lens,
    pilot: ownProps.lens.get(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps<AppState>): Dispatches {
  return {
    kiaed(self: Pilot) {
      if (ownProps.containerLens) {
        dispatch(update(ownProps.containerLens.modify(
          pilots => pilots.filter(pilot => pilot !== self)
        )))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PilotComponent);