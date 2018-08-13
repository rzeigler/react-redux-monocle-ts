import { Action } from "redux";

import { AppState } from './Types';

export interface StepAction extends Action<'step'>{
    type: 'step';
    step: (s: AppState) => AppState;
}

export function update(step: (s: AppState) => AppState): StepAction {
    return {
        type: 'step',
        step
    };
}