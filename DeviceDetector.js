import { DeviceTypeEnum, checkEnumEntry } from './DeviceTypeEnum'
import { Breakpoints, getRange } from './Breakpoints'

// Define the breakpoint where to differ between mobile and desktop devices.
let breaker = DeviceTypeEnum.desktop

// The plugin itself.
const DeviceDetector = {
  install: function (Vue, options) {

    /*
     * Options
     */

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

    /*
     * Functions
     */

    /**
     * Check if the current device seems to be a mobile device.
     * Use the inner window width as reference.
     *
     * @return  {Boolean} true  - if it is a mobile device
     *                    false - if not
     */
    function isMobile () {
      return (window.innerWidth < Breakpoints[breaker])
    }

    Vue.prototype.$isMobile = isMobile

    /**
     * Check if the current device seems to be a desktop device.
     * Use the inner window width as reference.
     *
     * @return  {Boolean} true  - if it is a desktop device
     *                    false - if not
     */
    function isDesktop () {
      return (window.innerWidth >= Breakpoints[breaker])
    }

    Vue.prototype.$isDesktop = isDesktop

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
    function isDevice (type) {
      // Get the range of the device type.
      // Don't care about the existence of the type, cause it is handled by the 'getRange' function as well.
      const range = getRange(type)

      return (window.innerWidth >= range.lowerLimit && window.innerWidth < range.upperLimit)
    }

    Vue.prototype.$isDevice = isDevice

    /*
     * Directives
     */
    
    /**
     * Directive to hide elements on mobile devices.
     * Depends on the 'isMobile' function.
     */
    Vue.directive('hide-on-mobile', {
      inserted: function (el) {
        // Check if we device type is mobile.
        if (isMobile()) {
          // Hide the element.
          el.style.display = 'none'
        }
      }
    })

    /**
     * Directive to hide elements on desktop devices.
     * Depends on the 'isMobile' function.
     */
    Vue.directive('hide-on-desktop', {
      inserted: function (el) {
        // Check if we device type is desktop.
        if (isDesktop()) {
          // Hide the element.
          el.style.display = 'none'
        }
      }
    })

    /**
     * Directive to hide elements on device type specified by the binding.
     * Depends on the 'isDevice' function.
     */
    Vue.directive('hide-on-device', {
      inserted: function (el, binding) {
        // Parse binding as device type.
        let type

        if (DeviceTypeEnum[binding.value.type]) {
          // It is a plain device type key.
          type = DeviceTypeEnum[binding.value.type]
        } else if (checkEnumEntry(binding.value)) {
          // It is a device type hash value.
          type = binding.value
        } else {
          throw new Error('Can not hide unkown device type: ' + binding.value)
        } 

        // Check if we device type is the binded one.
        if (isDevice(type)) {
          // Hide the element.
          el.style.display = 'none'
        }
      }
    })
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DeviceDetector)
}

// Define exports.
export default DeviceDetector
export { DeviceDetector, DeviceTypeEnum }
