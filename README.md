# Workman

## A framework for service worker. Inspired by express.js

### NOTE: this project is a WIP

## Installation
```shell
npm install workman-sw
```

## Usage

### Config object
```js

workman('fetch', {
    urls: [
        // an array of regex expression
        /\/api\/v1\/\w+/g,
    ]
})

```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.


## Security
If you discover any security related issues, please email opensource@acadea.io instead of using the issue tracker.

## Credits
- [Sam Ngu](https://github.com/sam-ngu)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.