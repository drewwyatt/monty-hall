import Listr from 'listr'
import { range } from 'ramda'

const simulate = async (numberOfTrials: number, shouldSwitch: boolean) => {
  const tasks = new Listr(
    range(0, numberOfTrials).map(idx => ({
      title: `Trial #${idx + 1}`,
      task: () =>
        new Promise((r, e) =>
          setTimeout(() => (idx % 2 === 0 ? r() : e(new Error())), 200 + idx),
        ),
    })),
    { concurrent: 5, exitOnError: false },
  )

  const ctx = tasks.run().catch(() => null)
  // console.log('context:', ctx)
}

export default simulate
