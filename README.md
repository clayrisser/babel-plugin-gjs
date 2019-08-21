# babel-plugin-gjs

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/babel-plugin-gjs.svg?style=social&label=Stars)](https://github.com/codejamninja/babel-plugin-gjs)

> babel plugin for gjs

For best results, run transpiled code with [CGJS](https://github.com/cgjs/cgjs)

Please ★ this repo if you found it useful ★ ★ ★

## Features

### Wraps classes with `GObject.registerClass`

#### Before
```js
const MyWindow = GObject.registerClass(
  class MyWindow extends Gtk.Window {
    _init() {
      super._init({ title: 'Hello World' });
      this.button = new Gtk.Button({ label: 'Click here' });
      this.button.connect('clicked', this.handleClicked);
      this.add(this.button);
    }

    handleClicked() {
      console.log('Button clicked');
    }
  }
);
```

#### After
```js
class MyWindow extends Gtk.Window {
  constructor() {
    super({ title: 'Hello World' });
    this.button = new Gtk.Button({ label: 'Click here' });
    this.button.connect('clicked', this.handleClicked);
    this.add(this.button);
  }

  handleClicked() {
    console.log('Button clicked');
  }
}
```

## Installation

```sh
npm install --save-dev babel-plugin-gjs
```

_.babelrc_
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "4"
        }
      }
    ]
  ],
  "plugins": [
    "gjs"
  ]
}
```

## Dependencies

- [CGJS](https://github.com/cgjs/cgjs)
- [GJS](https://wiki.gnome.org/Projects/Gjs)
- [NodeJS](https://nodejs.org)

## Usage

```sh
babel src -d lib
cgjs lib
```

## Support

Submit an [issue](https://github.com/codejamninja/babel-plugin-gjs/issues/new)

## Screenshots

[Contribute](https://github.com/codejamninja/babel-plugin-gjs/blob/master/CONTRIBUTING.md) a screenshot

## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/babel-plugin-gjs/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/codejamninja/babel-plugin-gjs/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2018

## Changelog

Review the [changelog](https://github.com/codejamninja/babel-plugin-gjs/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author

## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
