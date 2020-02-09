import Listr from 'listr'
import { range } from 'ramda'

const simulate = (numberOfTrials: number, shouldSwitch: boolean) => {
  const tasks = new Listr(
    range(0, numberOfTrials).map(idx => ({
      title: `Trial #${idx + 1}`,
      task: () => new Promise(r => setTimeout(() => r(), 1000 + idx)),
    })),
  )

  tasks.run()
}

export default simulate
