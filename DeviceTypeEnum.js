/*
 * Enumeration that includes all device types.
 * These types are according to the include media package.
 */
const DeviceTypeEnum = {
  phone: 'f7a42fe7211f98ac7a60a285ac3a9e87',
  tablet: 'c4e0ba5422383082417c5f96ab121575',
  desktop: 'b2c79ad7dcf03ba266dc0885e1266675'
}

/**
 * Check if a given entry exists in the enumeration.
 *
 * @param   {String} entry
 *          The entry to check if it exists.   
 *
 * @return  {Boolean} true  - if the entry exists
 *                    false - if not
 */
function checkEnumEntry (entry) {
  // Iterate over the whole DeviceTypeEnum object.
  for (let i in DeviceTypeEnum) {
    // Check if it is the searched for entry.
    if (DeviceTypeEnum[i] === entry) {
      return true
    }
  }

  // No enumeration entry could been found.
  return false
}

// Define exports
export default DeviceTypeEnum
export { DeviceTypeEnum, checkEnumEntry }

