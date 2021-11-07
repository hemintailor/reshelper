# RESHELPER

Reshelper provides a simple way of returning basic REST API responses.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

https://www.npmjs.com/package/reshelper

[![npm](https://nodei.co/npm/reshelper.png)](https://www.npmjs.com/package/reshelper)

## Installation

Package is available at: https://www.npmjs.com/package/reshelper

Use package manager to install

```
  npm i reshelper
``` 

Now go to your main file (app.js / index.js) of node project. and set code shown below.

```
const resHelper = require('reshelper');

app.use(resHelper);
```
Yes that's it.

## Usage

### Success response
```javascript
router.get('/', (req, res, next) => {
  return res.data({foo: 'bar'});
});
```

It will Generate the response shown below:

```json
{
  "code": 200,
  "success": true,
  "data": {
    "foo": "bar"
  },
  "error": null,
  "message": ""
}
```

### Success response with a message and code.

if your data object contains "code" key, It will consider it as response code.
Your response status code will be changed to given code. You can ignore it by setting `.env` variable `RES_HALPER_IGNORE_STATUS_CODE=true`

```javascript
router.get('/', (req, res, next) => {
  const data = {foo: 'bar', code: 201}
  return res.data(data, 'Data found.');
});
```

It will Generate the response shown below:

```json
{
  "code": 201,
  "success": true,
  "data": {
    "foo": "bar",
    "code": 201
  },
  "error": null,
  "message": "Data found."
}
```

### Error response
```javascript
router.get('/', (req, res, next) => {
  return res.error(new Error('Anything happen'))
});
```

It will Generate the response shown below:

```json
{
  "code": 500,
  "success": false,
  "data": null,
  "error": {
    "message": "Anything bad happen",
    "stack": "Error: Anything bad happen\n    at app\\routes\\index.js:9:20\n    at Layer.handle [as handle_request] (app\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (app\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (app\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (app\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at app\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (app\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (app\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at Function.handle (app\\node_modules\\express\\lib\\router\\index.js:174:3)\n    at router (app\\node_modules\\express\\lib\\router\\index.js:47:12)"
  },
  "message": "Anything bad happen"
}
```

### Error response with custom code
```javascript
router.get('/', (req, res, next) => {
  return res.error(new Error('Anything happen'), 400)
});
```

It will Generate the response shown below:
you can always remove "stack" from response, By simply setting the `.env` variable `RES_HALPER_DISABLE_ERR_STACK=false`.

```json
{
  "code": 400,
  "success": false,
  "data": null,
  "error": {
    "message": "Anything bad happen",
    "stack": "Error: Anything bad happen\n    at app\\routes\\index.js:9:20\n    at Layer.handle [as handle_request] (app\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (app\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (app\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (app\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at app\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (app\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (app\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at Function.handle (app\\node_modules\\express\\lib\\router\\index.js:174:3)\n    at router (app\\node_modules\\express\\lib\\router\\index.js:47:12)"
  },
  "message": "Anything bad happen"
}
```

### Message response
```javascript
router.put('/', (req, res, next) => {
  return res.message('Data updated.');
});
```

It will Generate the response shown below:

```json
{
  "code": 200,
  "success": true,
  "data": null,
  "error": null,
  "message": "Data updated."
}
```

### Methods
```javascript
  return res.data({foo: 'bar'});
  return res.data({foo: 'bar'}, 'Your Message'); // with custom message
  return res.data({foo: 'bar', code: 201}, 'Your Message'); // with custom code
  return res.message('Your Message');
  return res.message('Your Message', 200); // with custom code
  return res.error(new Error('Anything happen'));
  return res.error(new Error('Anything happen'), 400);  // with custom code
```


### Some ENV variables

| Variable | Description |
| --- | --- |
| RES_HALPER_IGNORE_STATUS_CODE | Boolean (default: false)<br/>true: will ignore status code, always set to 200. <br/>false: Will set status code according|
| RES_HALPER_ERR_CONSOLE | Boolean (default: false)<br/>true: will display error in console. <br/>false: Will disable error console|
| RES_HALPER_DISABLE_ERR_STACK | Boolean (default: false)<br/>true: will hide stack from error in response. <br/>false: Will display error stack in response|


## Contributing

If you want to contribute in any of these ways:

- Give your ideas or feedback
- Enhance the code or its documentation
- Point out a problem or issue
- Question something
- Help in any other way

You can (and should) [open an issue](https://github.com/hemintailor/reshelper/issues/new) or even a [pull request](https://github.com/hemintailor/reshelper/compare)!

Thanks for your interest in contributing to this repo!

## Author

[Luiz Felipe Zarco](https://github.com/hemintailor) (flyingtailorbird@gmail.com)

## License

This code is licensed under the [MIT License](https://github.com/hemintailor/reshelper/blob/master/LICENSE). See the [LICENSE.md](https://github.com/hemintailor/reshelper/blob/master/LICENSE) file for more info.