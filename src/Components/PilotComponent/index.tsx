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

function mapStateToProps<S>(state: S, ownProps: OwnProps<S>): Props<S> {
  return {
    lens: ownProps.lens,
    pilot: ownProps.lens.get(state)
  };
}

function mapDispatchToProps<S>(dispatch: Dispatch<Action>, ownProps: OwnProps<S>): Dispatches {
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