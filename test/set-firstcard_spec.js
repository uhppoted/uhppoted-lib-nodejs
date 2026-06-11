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
        startTime: '08:30',
        endTime: '17:45',
        activeMode: 'normally open',
        inactiveMode: 'first-card only',
        weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
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
        startTime: '08:30',
        endTime: '17:45',
        activeMode: 'normally open',
        inactiveMode: 'first-card only',
        weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
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

    it('should fail with invalid firstcard', function () {
      const controller = 405419896
      const door = 3
      const firstcard = {
        startTime: '08:30',
        endTime: '17:45',
        activeMode: 'first-card only',
        inactiveMode: 'first-card only',
        weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
      }

      return uhppoted
        .setFirstCard({}, { id: controller, address: '192.168.1.125', protocol: 'tcp' }, door, firstcard)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid firstcard active-mode (first-card only)')
        })
    })
  })
})
