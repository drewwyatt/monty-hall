import { range } from 'ramda'

export enum DoorState {
  Open,
  Closed,
}

export enum Prize {
  Car,
  Goat,
}

export type Selection = [Prize, DoorState]

type GameState = [Selection, Selection, Selection]

const rollDie = () => Math.floor(Math.random() * 3)

export class Game {
  private state: GameState
  private selection: number = -1

  constructor() {
    const winningIdx = rollDie()
    this.state = (range(0, 3).map(idx => [
      idx === winningIdx ? Prize.Car : Prize.Goat,
      DoorState.Closed,
    ]) as unknown) as GameState
  }

  public makeSelection = (idx: number = rollDie()) => {
    this.selection = idx
  }

  public openDoor = () => {
    let didOpen = false
    this.state = this.state.map(([prize, doorState]) => {
      if (!didOpen && prize === Prize.Goat) {
        didOpen = true
        return [prize, DoorState.Open]
      }

      return [prize, doorState]
    }) as GameState
  }

  public switchDoors = () => {
    this.selection = this.state.findIndex(
      ([, doorState], idx) => doorState === DoorState.Closed && idx !== this.selection,
    )
  }

  public get didWin() {
    return this.state[this.selection][0] === Prize.Car
  }
}
