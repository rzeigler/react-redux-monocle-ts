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

export const index = <S>(i: number) => new Lens<ReadonlyArray<S>, S>(
  a => a[i],
  a => s => s.slice(0, i).concat([a]).concat(s.slice(i + 1, s.length))
)