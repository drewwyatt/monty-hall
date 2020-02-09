import Listr from 'listr'
import { range } from 'ramda'
import { Game } from './models'

const playGame = () => {}

const simulate = async (numberOfTrials: number, shouldSwitch: boolean) => {
  const ctx = { wins: 0, losses: 0 }
  const simulation = new Listr(
    range(0, numberOfTrials).map(idx => ({
      title: `Trial #${idx + 1}`,
      task: () =>
        new Promise((reportWin, reportLoss) => {
          const game = new Game()
          game.makeSelection()
          game.openDoor()
          if (shouldSwitch) {
            game.switchDoors()
          }
          if (game.didWin) {
            ctx.wins = ctx.wins + 1
            reportWin()
          } else {
            ctx.losses = ctx.losses + 1
            reportLoss(new Error())
          }
        }),
    })),
    { exitOnError: false },
  )

  await simulation.run({ wins: 0, losses: 0 }).catch(() => null)
  // console.log('ctx', ctx)
  console.log(`Wins: ${ctx?.wins ?? 0}`)
  console.log(`Losses: ${ctx?.losses ?? 0}`)
  console.log(`(${Math.floor(((ctx?.wins ?? 0) * 100) / (numberOfTrials ?? 0))}%)`)
}

export default simulate
