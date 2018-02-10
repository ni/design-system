# Fuse

Fuse is a living design system that unites a robust set of UI elements with a flexible technology platform creating cohesive, intuitive experiences for National Instruments software users.

[Fuse](https://ni.github.io/design-system/)

## Installation instructions

(Instructions are based off of those for the [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit).)

- Clone this repository or download it as a .zip file and unzip.
- Install jekyll (and any other Ruby gems) with `bundle install`. (Prerequisite: must have Ruby installed; in Ubuntu/Debian, use `sudo apt-get install ruby-dev`. You may also have to install bundler with `gem install bundler`.)
- From the project root folder, run `npm install -g gulp bower && npm install && bower install`. (See the old [Polymer Starter Kit installation instructions](https://github.com/PolymerElements/polymer-starter-kit/blob/5602f0d3352540335eae413ff35d90cbeab9ee72/README.md) for more details or troubleshooting.)

## Structure
This documentation is generated with [Jekyll](https://jekyllrb.com/), a static site generator.

- `app/`: All Jekyll content is here. (This is where all the editing happens)
  - `bower_components`: Content installed via bower ends up here
  - `elements/`: Custom web components using Polymer
  - `images/`: Visual images
  - `media/`: Other user content (PDFs, videos, etc.) for final product
  - `scripts/`: Javascript files
  - `styles/`: Custom CSS
  - `_data/`: Data files to help generate colors and icon pages 
- `node_modules`: Content installed via npm goes here

### Serve/watch

`jekyll serve`: Starts a jekyll serve process on the default port (4000 or whatever is specified in `_config.yml`).


[MIT License](LICENSE)
