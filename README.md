[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Issues](https://img.shields.io/codeclimate/issues/github/me-and/mdf.svg)](#issues)

# vue-device-detector
A [Vue](https://vuejs.org) plugin that add global functionality to check the device type, the client is displayed on.
Works in relation to the [Include Media](https://github.com/eduardoboucas/include-media) _SASS_ library.
This means that this plugin has the same device types and share the breakpoints to differ them.<br>
So far this plugin is not hard related to the library, so there is no dependency and changes there will have no affects here.

<!-- TOC Begin -->
- [Advantage](#advantage)
- [Installation](#installation)
  - [Module](#module)
- [Device Types](#device-types)
- [Configuration](#configuration)
  - [Example](#example)
  - [Practise](#practise)
- [Usage](#usage)
  - [Functions](#functions)
  - [Example](#example)
<!-- TOC End -->


## Advantage
This plugin helps to adjust the behavior of your _Vue_ client for different devices. Especially when working with the _Include Media_ library<br>
Sometimes it is not possibl to simply work with `@include media('...')` in the style sheets, to hide elements or functionality. 
In such cases a _Vue_ component method have to know on which device type the client is displayed.
To be conform with the style sheets, it is useful to have the same understanding what a [device type](#device-types) is and define it the same way.
Using this plugin provides a good synergy between the script and style parts, when using _Include Media_ (tested with version `1.4.9`)


## Installation

```js
npm install weilbith/vue-device-detector
```

### Module
```js
import Vue from 'vue'
import VueDeviceDetecor from 'vue-device-detector'
```

The plugin registered itself to _Vue_. Anyway it could been added by `Vue.use(VueDeviceDetector)`.

---


## Device Types

As said the device types refer to the _Include Media_ library.
The exact list can be found [here](https://github.com/weilbith/vue-device-detector/blob/master/DeviceTypeEnum.js) and contains the following entries:<br>
- `mobile`
- `tablet`
- `desktop`

The types are related to so called _breakpoints_, also defined to _Include Media_.
A breakpoint define the minimum window width of a client, so it is recognized as this device type.<br>
Check [this definitions](https://github.com/weilbith/vue-device-detector/blob/master/Breakpoints.js) for the correct values.

| Type | Breakpoint |
| --- | --- |
| mobile | 320px |
| tablet | 768px |
| desktop | 1024 |

---


## Configuration

The plugin does work with a default configuration. Anyway it is possible to provide an options object.<br>
Therefore only the property `breaker` is defined so far. It divide the device types into two sections:
The desktop types and the mobile types. Do not mix this denotation with the device types `mobile` and `desktop`.<br>
It should help to work with a client that only differ between two groups of types.<br>
The `breaker` describe the first element of the upper group.
All types that are "smaller" are in the lower group, the rest in the upper.<br>
The default breaker is set to `desktop`.


### Example

breaker: `desktop`<br>

LowerGroup: `mobile`, `tablet`<br>
UpperGroup: `desktop`<br>


### Practise
```js
import Vue from 'vue'
import { VueDeviceDetecor, DeviceTypEnum } from 'vue-device-detector'

Vue.use(VueDeviceDetector, { breaker: DeviceTypEnum.desktop })
```
---


## Usage

### Functions

The plugin provides three functions to use:

| Function | Arguments | Description |
| --- | --- | --- |
| `$isMobile` | _None_ | Check in relation to the configuartion if the device type is in the lower group. |
| `$isDesktop` | _None_ | Check in relation to the configuartion if the device type is in the upper group. |
| `$isDevice` | _Type_ | Check if the device type is exactly the specified one. |


### Example

The plugin functionality is registered globally an can be be accessed by any component.<br>

```js
<script>
  // Import the device type enumeration.
  import { DeviceTypeEnum } from 'vue-device-detector '
  
  export default {
    ...
    methods: {
      doOnUpperGroup () {
        // Do something only on devices of the upper group.
        if (this.$isDesktop()) {
          // Do your stuff here...
        }
      },
      
      doOnTablet () {
        // Do something only if the device match the specific type.
        if (this.$isDevice(DeviceTypeEnum.tablet)) {
          // Do your stuff here...
        }
      }
    },
    ...
  }
</script>
```
