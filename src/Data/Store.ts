import { createStore, Action } from 'redux';
import { StepAction } from './Action';
import { AppState } from './Types';

export const initial: AppState = {
    squadrons: [{
        name: 'Primus',
        sorties: 0,
        mission: 'intercept',
        commander: {
            callsign: 'Apollo',
            kills: 0
        },
        pilots: [{
            callsign: 'Starbuck',
            kills: 0
        }, {
            callsign: 'Hotdog',
            kills: 0
        }, {
            callsign: 'Racetrack',
            kills: 0
        }, ]
    }, {
        name: 'Vigilantes',
        sorties: 0,
        mission: 'intercept',
        commander: {
            callsign: 'Helo',
            kills: 0
        },
        pilots: [{
            callsign: 'Athena',
            kills: 0
        }, {
            callsign: 'Showboat',
            kills: 0
        }, {
            callsign: 'Hardball',
            kills: 0
        }]
    }]
}

export function reducer(state: AppState = initial, action: Action<any>) {
    if (action.type === 'step') {
        return (action as StepAction).step(state);
    }
    return state;
}

export const store = createStore(
    reducer, /* preloadedState, */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);