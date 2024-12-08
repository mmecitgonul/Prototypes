export const _size: number = 20;
export let _speed: number = .5;
export const _jump: number = 10;
export const _friction: number = .9;
export const _gravity: number = .5;
export const _follow: Vector = {x: .05, y: .08};
export let _1: number = 2;
export let _2: number = 3;
export let _3: number = 4;
export const _sheetNum: string = "[2]  [3]  [4]"
export const _sheetOpr: string = "z: [/]  x: [x]  c: [-]"

export interface Vector {
    x: number;
    y: number;
}

export interface Declared {
    n: number;
    set: boolean;
}