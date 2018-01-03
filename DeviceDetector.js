import { DeviceTypeEnum, checkEnumEntry } from './DeviceTypeEnum'
import { Breakpoints, getRange } from './Breakpoints'

// Define the breakpoint where to differ between mobile and desktop devices.
let breaker = DeviceTypeEnum.desktop

// The plugin itself.
const DeviceDetector = {
  install: function (Vue, options) {
    // Check if an breaker has been defined in the options.
    if (options && options.breaker) {
      // Make sure if the defined breaker exists.
      if (checkEnumEntry(options.breaker)) {
        breaker = options.breaker
      } else {
        // Use default breaker and throw error.
        throw new Error('Invalid breaker option: ' + options.breaker)
      }
    }

    /**
     * Check if the current device seems to be a mobile device.
     * Use the inner window width as reference.
     *
     * @return  {Boolean} true  - if it is a mobile device
     *                    false - if not
     */
    Vue.prototype.$isMobile = () => {
      return (window.innerWidth < Breakpoints[breaker])
    } 

    /**
     * Check if the current device seems to be a desktop device.
     * Use the inner window width as reference.
     *
     * @return  {Boolean} true  - if it is a desktop device
     *                    false - if not
     */
    Vue.prototype.$isDesktop = () => {
      return (window.innerWidth >= Breakpoints[breaker])
    }

    /**
     * Check if the current device seems to be a specific device.
     * More specific than 'isMobile' and 'isDesktop' cause it use the exact range of the type.
     * Use the inner window width as reference.
     *
     * @param   {DeviceTypeEnum} type
     *          The device type to check for.
     *
     * @return  {Boolean} true  - if it is the requested device type
     *                    false - if not
     */
    Vue.prototype.$isDevice = (type) => {
      // Get the range of the device type.
      // Don't care about the existence of the type, cause it is handled by the 'getRange' function as well.
      const range = getRange(type)

      return (window.innerWidth >= range.lowerLimit && window.innerWidth < range.upperLimit)
    }

  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DeviceDetector)
}

// Define exports.
export default DeviceDetector
export { DeviceDetector, DeviceTypeEnum }
