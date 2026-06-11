const { Buffer } = require('node:buffer')

const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const encoder = require('../../src/encoder.js')
const opcodes = require('../../src/opcodes.js')

describe('encode set-first-card', function () {
   it('should encode a set-first-card request', function () {
    const controller = 405419896

    const args = {
      door: 3,
      startTime: "8:30",
      endTime: "17:45",
      activeMode: opcodes.NormallyOpen,
      inactiveMode: opcodes.NormallyClosed,
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: false,
      saturday: true,
      sunday: true,      
    }
    
    // prettier-ignore
    const expected = Buffer.from([
      0x17, 0xaa, 0x00, 0x00, 0x78, 0x37, 0x2a, 0x18,  0x03, 0x08, 0x30, 0x01, 0x17, 0x45, 0x02, 0x01,
      0x01, 0x00, 0x01, 0x00, 0x01, 0x01, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ])

    const request = encoder.SetFirstCard(controller, args)

    expect(request).to.deep.equal(expected)
  })
})
