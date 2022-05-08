# Cloudza SDK for JavaScript

Weather Monetization API

## Getting Started

These instructions will get you a quick way of how to set up and use this library.

## How To Install

The preferred way to install the Cloudza SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install cloudza-sdk
```

## Usage
The Cloudza SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects and to support tools that can read `.d.ts` files.

In a TypeScript file:

```javascript
import cloudza from 'cloudza-sdk';
```

In a JavaScript file:

```javascript
const cloudza = require('cloudza-sdk');
```

Setup API Key before using other methods

```javascript
cloudza.setApiKey('your_api_key');
```

Call methods like ***getWeather***

```javascript
cloudza.getWeather();
```

(Optional) if you are doing development you can switch URLs to target different cloudza server
```javascript
cloudza.setUrl('http://localhost:5000')
```

Servers:
* Dev - https://dev.cloudza.spolnici.com
* Prod - https://cloudza.spolnici.com

## Authors

* **Luka Patarčić** - *web developer* - [LukaPatarcic](https://github.com/LukaPatarcic)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
