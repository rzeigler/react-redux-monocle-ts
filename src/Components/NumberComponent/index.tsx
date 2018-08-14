import { connect } from 'react-redux';
import { Lens } from 'monocle-ts';
import { Props, Dispatches } from './component';
import { AppState } from 'src/Data/Types';
import { update } from 'src/Data/Action';
import { Dispatch, Action } from 'redux';
import NumberComponent from './component';

/**
 * Component implementations in this model
 * This is an entirely generic number edit component. It needs
 */
export interface OwnProps<S> {
  lens: Lens<S, number>;
  label: string;
}

function mapStateToProps<S>(state: S, ownProps: OwnProps<S>): Props {
  return {
    value: ownProps.lens.get(state),
    label: ownProps.label
  }
}

function mapDispatchToProps<S>(dispatch: Dispatch<Action>, ownProps: OwnProps<S>): Dispatches {
  return {
    increment() {
      dispatch(update(ownProps.lens.modify(v => v + 1)));
    },
    decrement() {
      dispatch(update(ownProps.lens.modify(v => v - 1)));
    }
  }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(NumberComponent);
export default connected;