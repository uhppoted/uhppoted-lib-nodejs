const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('set-firstcard', function () {
  describe('#set-firstcard with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      const controller = 0
      const door = 3
      const firstcard = {
        start_time: '08:30',
        end_time: '17:45',
        active_mode: 1,
        inactive_mode: 3,
        weekdays: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: true,
        },
      }

      return uhppoted
        .setFirstCard({}, controller, door, firstcard)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      const controller = 0
      const door = 3
      const firstcard = {
        start_time: '08:30',
        end_time: '17:45',
        active_mode: 1,
        inactive_mode: 3,
        weekdays: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: true,
        },
      }

      return uhppoted
        .setFirstCard({}, { id: controller, address: '192.168.1.125', protocol: 'tcp' }, door, firstcard)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })
  })
})
