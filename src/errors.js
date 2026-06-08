const translate = require('./internationalisation.js').translate
const opcodes = require('./opcodes.js')

function InvalidDeviceID(deviceId, locale) {
  return new Error(translate(`{{invalid controller ID}} '${deviceId}'`, locale))
}

function InvalidCardNumber(card, locale) {
  return new Error(translate(`{{invalid card number}} '${card}'`, locale))
}

function InvalidCardIndex(index, locale) {
  return new Error(translate(`{{invalid card index}} '${index}'`, locale))
}

function InvalidCardPIN(pin, locale) {
  return new Error(translate(`{{invalid card keypad PIN}} ${pin}`, locale))
}

function InvalidProfileID(profileId, locale) {
  return new Error(translate(`{{invalid time profile ID}} '${profileId}'`, locale))
}

function InvalidDoor(door, locale) {
  return new Error(translate(`{{invalid door}} '${door}'`, locale))
}

function InvalidEventIndex(index, locale) {
  return new Error(translate(`{{invalid event index}} '${index}'`, locale))
}

function InvalidFunctionCode(code, locale) {
  return new Error(translate(`{{invalid protocol function code}} ${code}`, locale))
}

function InvalidDoorControl(control, locale) {
  return new Error(translate(`{{invalid door control}} ${control}`, locale))
}

function InvalidPermission(door, permission, locale) {
  return new Error(translate(`{{invalid time profile for door}} ${door} (${permission})`, locale))
}

function InvalidTaskType(task, locale) {
  return new Error(translate(`{{invalid task type}} '${task}'`, locale))
}

function InvalidDoorControlMode(mode, locale) {
  return new Error(translate(`{{invalid door control mode}} '${mode}'`, locale))
}

function InvalidFirstCard(firstcard, locale) {
  if (![opcodes.Controlled, opcodes.NormallyOpen, opcodes.NormallyClosed].includes(firstcard.active_mode)) {
    const mode = () => {
      switch (firstcard.active_mode) {
        case opcodes.NormallyOpen:
          return '{{normally open}}'

        case opcodes.NormallyClosed:
          return '{{normally closed}}'

        case opcodes.Controlled:
          return '{{controlled}}'

        case opcodes.FirstCardOnly:
          return '{{first-card only}}'

        default:
          return `${firstcard.active_mode}`
      }
    }

    return new Error(translate(`{{invalid firstcard active-mode}} (${mode()})`, locale))
  }

  if (![opcodes.Controlled, opcodes.NormallyOpen, opcodes.NormallyClosed, opcodes.FirstCardOnly].includes(firstcard.inactive_mode)) {
    const mode = () => {
      switch (firstcard.active_mode) {
        case opcodes.NormallyOpen:
          return '{{normally open}}'

        case opcodes.NormallyClosed:
          return '{{normally closed}}'

        case opcodes.Controlled:
          return '{{controlled}}'

        case opcodes.FirstCardOnly:
          return '{{first-card only}}'

        default:
          return `${firstcard.active_mode}`
      }
    }

    return new Error(translate(`{{invalid firstcard inactive-mode}} (${mode()})`, locale))
  }

  return new Error(translate(`{{invalid firstcard}} (${firstcard})`, locale))
}

function NoReply(locale) {
  return new Error(translate('{{no reply}}', locale))
}

function NoReplyFromDevice(deviceId, locale) {
  return new Error(translate(`${deviceId}: {{no reply}}`, locale))
}

function NoReplyToBroadcast(locale) {
  return new Error(translate('{{no reply to broadcasted request}}', locale))
}

function InvalidBroadcastReply(locale) {
  return new Error(translate('{{invalid reply to broadcasted request}}', locale))
}

function Timeout(locale) {
  return new Error(translate('{{timeout}}', locale))
}

function MissingEvent(deviceId, index, locale) {
  return new Error(translate(`${deviceId}:${index}  {{event does not exist}}`, locale))
}

function EventOverwritten(deviceId, index, locale) {
  return new Error(translate(`${deviceId}:${index}  {{event overwritten}}`, locale))
}

module.exports = {
  InvalidDeviceID,
  InvalidDoor,
  InvalidCardNumber,
  InvalidCardIndex,
  InvalidCardPIN,
  InvalidProfileID,
  InvalidEventIndex,

  InvalidFunctionCode,
  InvalidDoorControl,
  InvalidPermission,
  InvalidTaskType,
  InvalidDoorControlMode,
  InvalidFirstCard,

  NoReply,
  NoReplyFromDevice,
  NoReplyToBroadcast,
  InvalidBroadcastReply,
  Timeout,
  MissingEvent,
  EventOverwritten,
}
