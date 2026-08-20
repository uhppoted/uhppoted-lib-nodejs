const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.125'
const cardNumber = '10058400'
const validFrom = '2026-01-01'
const validUntil = '2026-12-31'
const doors = { 1: true, 2: false, 3: 29, 4: true }
const PIN = 7531
const firstcard = { 1: false, 2: true, 3: true, 4: false }

async function run() {
  await uhppoted
    .putCard(ctx, deviceID, cardNumber, validFrom, validUntil, doors, PIN, firstcard)
    .then((response) => {
      console.log('\nput-card:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .putCard(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, cardNumber, validFrom, validUntil, doors, PIN, firstcard)
    .then((response) => {
      console.log('\nput-card:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()
