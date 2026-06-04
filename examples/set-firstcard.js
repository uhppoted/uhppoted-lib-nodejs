const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const controller = 405419896
const addr = '192.168.1.125'
const door = 3
const firstcard = {
  start_time: '08:30',
  end_time: '16:45',
  active_mode: 'normally open',
  inactive_mode: 'firstcard only',
  weekdays: ['Monday', 'Wednesday', 'Friday'],
}

async function run() {
  await uhppoted
    .setFirstCard(ctx, controller, door, firstcard)
    .then((response) => {
      console.log('\nset-firstcard:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setFirstCard(ctx, { id: controller, address: addr, protocol: 'tcp' }, door, firstcard)
    .then((response) => {
      console.log('\nset-firstcard:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()
