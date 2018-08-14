import { Action } from "redux";

import { AppState } from './Types';

/**
 * Here we have the action specification.
 * Its quite simple, just a type, an ad-hoc reducer and some optional debug information.
 * It was pointed out that the debug helper can aid in figuring out what the function
 * was intending to do, since it will not appear in a redux devtool window and there is
 * only one action type.
 */
export interface StepAction<S> extends Action<'step'>{
    type: 'step';
    step: (s: S) => S;
    debug?: any
}

export function update<S>(step: (s: S) => S, debug?: any): StepAction<S> {
    return {
        type: 'step',
        step,
        debug
    };
}