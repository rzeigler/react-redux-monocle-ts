import { Lens } from 'monocle-ts';

export interface Pilot {
    readonly callsign: string;
    readonly kills: number;
}

export const callsign = Lens.fromProp<Pilot, 'callsign'>('callsign');
export const kills = Lens.fromProp<Pilot, 'kills'>('kills');

export type Mission = 'intercept' | 'assault' | 'transport';

export interface Squadron {
    readonly name: string;
    readonly sorties: number;
    readonly commander: Pilot;
    readonly pilots: ReadonlyArray<Pilot>;
    readonly mission: Mission;
}

export const name = Lens.fromProp<Squadron, 'name'>('name');
export const sorties = Lens.fromProp<Squadron, 'sorties'>('sorties');
export const commander = Lens.fromProp<Squadron, 'commander'>('commander');
export const pilots = Lens.fromProp<Squadron, 'pilots'>('pilots');
export const mission = Lens.fromProp<Squadron, 'mission'>('mission');

export interface AppState {
    squadrons: ReadonlyArray<Squadron>;
}

export const squadrons = Lens.fromProp<AppState, 'squadrons'>('squadrons');

/**
 * An example of creating a new lens.
 * This lens does not exist in monocle as generally Traverses when working with arrays.
 * This shows the get/set of an array.
 * This is 'unsafe' because there is no bounds checking an this should technically be a Prism (or maybe Optional)
 * Its only use is for supporting lens composition through an array of known size so we just ignore this problem.
 */
export const unsafeIndex = <S>(i: number) => new Lens<ReadonlyArray<S>, S>(
  a => a[i],
  a => s => s.slice(0, i).concat([a]).concat(s.slice(i + 1, s.length))
)