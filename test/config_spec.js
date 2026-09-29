const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe.only('constructor', function () {
  it('should build a valid default config', function () {
    const cfg = new uhppoted.Config()

    expect(cfg.name).to.equal('uhppoted')
    expect(cfg.bind).to.equal('0.0.0.0')
    expect(cfg.broadcast).to.equal('255.255.255.255:60000')
    expect(cfg.listen).to.equal('0.0.0.0:60001')
    expect(cfg.timeout).to.equal(5000)
    expect(cfg.controllers).to.deep.equal(new Map())
    expect(cfg.debug).to.equal(false)
  })

  it('should build a valid config from the supplied information', function () {
    const cfg = new uhppoted.Config('examples', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', 2500, [], true)

    expect(cfg.name).to.equal('examples')
    expect(cfg.bind).to.equal('192.168.1.100')
    expect(cfg.broadcast).to.equal('192.168.1.255:60000')
    expect(cfg.listen).to.equal('192.168.1.100:60001')
    expect(cfg.timeout).to.equal(2500)
    expect(cfg.controllers).to.deep.equal(new Map())
    expect(cfg.debug).to.equal(true)
  })
})
