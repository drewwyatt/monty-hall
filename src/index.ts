#!/usr/bin/env node
import yargs, { Argv } from 'yargs'
import simulate from './simulate'

const { trials, switch: switchDoors } = (yargs as Argv<{
  trials: number
  switch: boolean
}>)
  .command(
    '$0 <trials> [switch]',
    'simulate the outcome of a number of trials of the Monty Hall problem',
    argv =>
      argv.positional('trials', {
        type: 'number',
        description: 'number of trials to simulate',
      }),
  )
  .option('switch', {
    alias: 's',
    type: 'boolean',
    default: false,
    description:
      'whether or not the simulation should switch doors after a choice has been eliminated',
  })
  .example('$0 100', 'run 100 simulations without switching')
  .example('$0 250 --switch', 'run 250 simulations, switching doors each time').argv

simulate(trials, switchDoors)
