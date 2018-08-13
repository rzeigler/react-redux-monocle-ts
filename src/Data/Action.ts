import { Action } from "redux";

import { AppState } from './Types';

export interface StepAction extends Action<'step'>{
    type: 'step';
    step: (s: AppState) => AppState;
    debug?: any
}

export function update(step: (s: AppState) => AppState, debug?: any): StepAction {
    return {
        type: 'step',
        step,
        debug
    };
}