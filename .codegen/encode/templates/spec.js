const { Buffer } = require('node:buffer')

const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const encoder = require('../../src/encoder.js')
const opcodes = require('../../src/opcodes.js')

describe('encode {{ .Name }}', function () {
   it('should encode a {{ .Request }} request', function () {
    const controller = {{ .Controller }}

    const args = {
      {{- range $arg := .Args }}
      {{ .Name }}: {{ .Value }},{{ end }}      
    }
    
    // prettier-ignore
    const expected = Buffer.from([
      {{- range $bytes := .Expected }}
      {{ $bytes }}{{ end }}
    ])

    const request = encoder.SetFirstCard(controller, args)

    expect(request).to.deep.equal(expected)
  })
})
