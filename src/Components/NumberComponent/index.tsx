import { connect } from 'react-redux';
import { Lens } from 'monocle-ts';
import { Props, Dispatches } from './component';
import { AppState } from 'src/Data/Types';
import { update } from 'src/Data/Action';
import { Dispatch, Action } from 'redux';
import NumberComponent from './component';

export interface OwnProps<S> {
  lens: Lens<S, number>;
  label: string;
}

function mapStateToProps(state: AppState, ownProps: OwnProps<AppState>): Props {
  return {
    value: ownProps.lens.get(state),
    label: ownProps.label
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps<AppState>): Dispatches {
  return {
    increment() {
      dispatch(update(ownProps.lens.modify(v => v + 1)));
    },
    decrement() {
      dispatch(update(ownProps.lens.modify(v => v - 1)));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberComponent);