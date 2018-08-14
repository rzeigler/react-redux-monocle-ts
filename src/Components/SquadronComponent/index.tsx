import { connect } from 'react-redux';
import { Squadron, mission, Mission, AppState, Pilot, kills, pilots, commander } from 'src/Data/Types';
import { Lens, fromTraversable } from 'monocle-ts';
import { array } from 'fp-ts/lib/Array'

import SquadronComponent, { Props, Dispatches } from './component';
import { Dispatch } from 'redux';
import { update } from 'src/Data/Action';
import { pipe } from '../../../node_modules/fp-ts/lib/function';

export interface OwnProps<S> {
    lens: Lens<S, Squadron>;
}

function mapStateToProps<S>(state: S, ownProps: OwnProps<S>): Props<S> {
    return {
        ...ownProps,
        squadron: ownProps.lens.get(state)
    };
}

const pilotTravsal = fromTraversable(array)<Pilot>()

function mapDispatchToProps<S>(dispatch: Dispatch, ownProps: OwnProps<S>): Dispatches {
  return {
    setMission(m: Mission): void {
      dispatch(update(ownProps.lens.compose(mission).set(m)));
    },
    groupKill(): void {
      const updatePilots = ownProps.lens
        .compose(pilots)
        .composeTraversal(pilotTravsal)
        .composeLens(kills)
        .modify(v => v + 1);
      const updateCommander = ownProps.lens
        .compose(commander)
        .compose(kills)
        .modify(v => v + 1);
      dispatch(update(pipe(updatePilots, updateCommander), 'group kill'));
    },
    resetKills(): void {
      const updatePilots = ownProps.lens
        .compose(pilots)
        .composeTraversal(pilotTravsal)
        .composeLens(kills)
        .set(0);
      const updateCommander = ownProps.lens
        .compose(commander)
        .compose(kills)
        .set(0);
      dispatch(update(pipe(updatePilots, updateCommander), 'reset kills'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadronComponent);