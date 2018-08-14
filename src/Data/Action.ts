import { Action, AnyAction } from "redux";

import { AppState } from './Types';

const sym = Symbol('StepAction');

/**
 * Here we have the action specification.
 * Its quite simple, just a type, an ad-hoc reducer and some optional debug information.
 * It was pointed out that the debug helper can aid in figuring out what the function
 * was intending to do, since it will not appear in a redux devtool window and there is
 * only one action type.
 */
export interface StepAction<S> extends Action<string>{
    type: string;
    __type: symbol;
    step: (s: S) => S;
    debug?: any
}

export function update<S>(step: (s: S) => S, name?: string, debug?: any): StepAction<S> {
    return {
        type: name || 'unnamed',
        __type: sym,
        step,
        debug
    };
}

export function isStepAction(action: AnyAction) {
  return action.__type === sym;
}