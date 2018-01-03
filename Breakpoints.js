import { DeviceTypeEnum, checkEnumEntry } from './DeviceTypeEnum'

/*
 * The breakpoints define by which window width,
 * it is associated with the responsible device type.
 * This is a copy of the include media package.
 */
const Breakpoints = {}
Breakpoints[DeviceTypeEnum.phone] = 320
Breakpoints[DeviceTypeEnum.tablet] = 768
Breakpoints[DeviceTypeEnum.desktop] = 1024

/**
 * Get the range of a device type in relation to the breakpoints.
 * The range is definded as the breakpoint of the type itself and the next upper type.
 * In case it is the type with the highest breakpoint, Number.MAX_VALUE is the upper limit.
 *
 * @param   {DeviceTypeEnum} type
 *          The device type to get the range for.
 *
 * @return  {Object} range
 *          An object with two properties 'lowerLimit' and 'upperLimit',
 *          describing the range of the device type.
 */
function getRange (type) {
  // Check if the given type is valid.
  if (!checkEnumEntry(type)) {
    throw new Error('Unkown device type: ' + type)
  }

  // Iterate over all breakpoints to find the correct one.
  for (let i in Breakpoints) {
    // Check if it is the correct type.
    if (i === type) {
      // Define the range to return.
      const range = {}

      // The lower limit of the range is the breakpoint of the type itself.
      range.lowerLimit = Breakpoints[i]

      // Get the upper limit.
      if (Breakpoints[i + 1]) {
        // It exist one more device type with a higher breakpoint.
        range.upperLimit = Breakpoints[i +1]
      } else {
        // Device type is the last entry, so use the maximum number value as upper limit.
        range.upperLimit = Number.MAX_VALUE
      }

      // Return range object.
      return range
    }
  }

}

// Define exports.
export default Breakpoints
export { Breakpoints, getRange }
