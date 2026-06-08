const { Buffer } = require('node:buffer')

const describe = require('mocha').describe
const before = require('mocha').before
const after = require('mocha').after
const it = require('mocha').it
const expect = require('chai').expect

const uhppoted = require('../index.js')
const ctx = require('./common.js').context
const setup = require('./common.js').setup
const teardown = require('./common.js').teardown

// prettier-ignore
const request = Buffer.from([
  0x17, 0xaa, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x03, 0x08, 0x30, 0x01, 0x17, 0x45, 0x03, 0x01,
  0x01, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

// prettier-ignore
const reply = Buffer.from([
  0x17, 0xaa, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])

describe('#setFirstCard(...)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply])
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-firstcard', function (done) {
    const expected = {
      deviceId: 405419896,
      ok: true,
    }

    const door = 3
    const firstcard = {
      start_time: '08:30',
      end_time: '17:45',
      active_mode: 'normally open',
      inactive_mode: 'first-card only',
      weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
    }

    uhppoted
      .setFirstCard(ctx, 405419896, door, firstcard)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute set-firstcard in klingon', function (done) {
    const context = {
      config: ctx.config,
      locale: 'klingon',
    }

    const expected = {
      deviceId: 405419896,
      ok: true,
    }

    const door = 3
    const firstcard = {
      start_time: '08:30',
      end_time: '17:45',
      active_mode: 'roD poS',
      inactive_mode: "wa'DIch chaw' neH",
      weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
    }

    uhppoted
      .setFirstCard(context, 405419896, door, firstcard)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})

describe('#setFirstCard(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute set-firstcard with address:port object', function (done) {
    const expected = {
      deviceId: 405419896,
      ok: true,
    }

    const controller = {
      id: 405419896,
      address: { address: '127.0.0.1', port: 59998 },
      protocol: 'tcp',
    }

    const door = 3
    const firstcard = {
      start_time: '08:30',
      end_time: '17:45',
      active_mode: 'normally open',
      inactive_mode: 'first-card only',
      weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
    }

    uhppoted
      .setFirstCard(ctx, controller, door, firstcard)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })

  it('should execute set-firstcard with address:port string', function (done) {
    const expected = {
      deviceId: 405419896,
      ok: true,
    }

    const controller = { id: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' }
    const door = 3
    const firstcard = {
      start_time: '08:30',
      end_time: '17:45',
      active_mode: 'normally open',
      inactive_mode: 'first-card only',
      weekdays: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
    }

    uhppoted
      .setFirstCard(ctx, controller, door, firstcard)
      .then((response) => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch((err) => done(err))
  })
})
