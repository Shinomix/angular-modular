# angular-modular
> Start an AngularJS project with a modular and scalable architecture using UI Router


## Getting started
To start using the project, `clone` or `fork` it. It uses node package manager (NPM) to manage global packages and Bower to manage extensions.

It also runs using Angular UI Router by default to handle routing, Sass for styling, Grunt for tasks management and is coded following [johnpapa's angular-styleguide](https://github.com/johnpapa/angular-styleguide).

Languages or frameworks can easily be switched (Grunt to Gulp, Sass to Less, etc.) keeping the same architecture. Just `bower uninstall` packages you don't want.


## Architecture
The folder architecture is the following one :
```
source/
    app/
        common/
            directive/
            factory/
            provider/
            service/
            style/
        modules/
        app.controller.js
        app.routes.js
        footer.tpl.html
        header.tpl.html
        style.scss
    assets/
        images/
    Gruntfile.js
    index.html
```


## Run the project
### Install the dependencies

> Require npm, sass, bower and grunt to be installed

To get project dependencies, simply run :

    npm i
    bower install -g


### Compile and run
Project works with `grunt` to compile, build, minify, ... the project. Result is pushed in a runtime created `build` folder.

There is two compiling tasks in the Gruntfile: one for dev, 'default' and one for production 'deploy'. Grunt watch is possible in dev, will be launched on 'default' task.


To run the project, run a static server with PHP (`php -S localhost:4242`) or Python (`python -m SimpleHTTPServer 4242`) in the `build` folder and go to `localhost:4242` with your web browser.
