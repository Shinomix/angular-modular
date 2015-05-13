(function() {
    'use strict';

    module.exports = function(grunt) {
        require('load-grunt-tasks')(grunt, {scope: 'dependencies'});

            grunt
                .registerTask('default', [
                    'build-dev',

                    /* Valid AngularJS code */
                    'jshint'
                ])

                .registerTask('deploy', [
                    'build-prod',

                    /* Valid AngularJS code */
                    'jshint'
                ])

                .registerTask('build-dev', [
                    /* Empty build folder */
                    'clean',

                    /* Bundle partial html files in AngularJS module */
                    'html2js',

                    /* Compile scss files for development purpose */
                    'sass:dev',

                    /* Concatenate all librairies and application script files in one */
                    'concat',

                    /* Compile index.html file */
                    'file-creator',

                    /* Copy assets to build folder */
                    'copy:assets'
                ])
                .registerTask('build-prod', [
                    'clean',
                    'html2js',
                    'copy:assets',
                    'concat',

                    /* Compile scss files for production purpose */
                    'sass:prod',

                    /* Minify javascript files */
                    'uglify',

                    'file-creator'
                ]);

            var pkg = grunt.file.readJSON('package.json');

            grunt.initConfig({
                pkg: pkg,

                banner: '/*\n' +
                '** <%= pkg.name %> version: <%= pkg.version %> (<%= pkg.homepage %>)\n' +
                '** <%= pkg.description %>\n' +
                '** <%= grunt.template.today("dd-mm-yyyy") %> - by : <%= pkg.author %>\n' +
                '*/\n',

                dirs: {
                    dest: 'build',
                    lib: 'bower_components',
                    src: 'source'
                },

                src: {
                    tpl: {
                        app: ['source/app/**/*.tpl.html']
                    },
                    jsTpl: [
                        '<%= dirs.dest %>/templates/**/*.js'
                    ]
                },

                clean: {
                    build: ['<%= dirs.dest %>'],
                    temp: ['<%= dirs.dest %>/script.*.js']
                },

                concat: {
                    options: {
                        banner: '<%= banner %>\n',
                        stripBanners: true,
                        separators: ';\n'
                    },
                    appJS: {
                        src: [
                            '<%= dirs.src %>/app/app.js', //Application setup
                            '<%= dirs.src %>/app/app.routes.js', //Default router config
                            '<%= dirs.src %>/app/app.controller.js', //Global application controller

                            /* Module specific javascript files */
                            '<%= dirs.src %>/app/modules/**/*.controller.js', //Every controllers in a module
                            '<%= dirs.src %>/app/modules/**/*.routes.js', //Every router config in a module

                            /* Common javascript files */
                            '<%= dirs.src %>/app/common/**/*.js', //Every directive, factories, providers and services

                            /* Partial html files */
                            '<%= src.jsTpl %>'
                        ],
                        dest: '<%= dirs.dest %>/script.app.js',
                        nonull: false
                    },
                    libJS: {
                        src: [
                            '<%= dirs.lib %>/angular/angular.min.js', //Load angular first
                            '<%= dirs.lib %>/angular-ui-router/release/*.min.js', //Angular UI Router
                        ],
                        dest: '<%= dirs.dest %>/script.lib.js',
                        nonull: true
                    },
                },

                copy: {
                    assets: {
                        files: [{
                            dest: '<%= dirs.dest %>/assets/',
                            src: '**',
                            expand: true,
                            cwd: '<%= dirs.src %>/assets'
                        }]
                    }
                },

                'file-creator': {
                    indexHtml: {
                        'build/index.html': function(fs, fd, done) {
                            /* Load index source file */
                            var index = grunt.file.read('source/index.html');

                            /* List style files */
                            var style = [
                                'style.css'
                            ];

                            /* List script files */
                            var script = [
                                'script.lib.js',
                                'script.app.js'
                            ];

                            var i; //iterator

                            /* Create link markups */
                            for (i = 0 ; i < style.length ; i++) {
                                style[i] = '<link rel="stylesheet" href="' + style[i] + '">';
                            }

                            /* Create script markups */
                            for (i = 0 ; i < script.length ; i++) {
                                script[i] = '<script type="text/javascript" src="' + script[i] + '"></script>';
                            }

                            /* Replace variables in index.html file */
                            index = index
                            .replace('<!-- %%title%% -->', pkg.name)
                            .replace('<!-- %%styles%% -->', style.join('\n\t'))
                            .replace('<!-- %%scripts%% -->', script.join('\n\t'));

                            fs.writeSync(fd, index);
                            done();
                        }
                    }
                },

                html2js: {
                    /* Create AngularJS module 'templates.app' */
                    app: {
                        options: {
                            base: '<%= dirs.src %>/app'
                        },
                        src: ['<%= src.tpl.app %>'],
                        dest: '<%= dirs.dest %>/templates/app.js',
                        module: 'templates.app'
                    }
                },

                jshint: {
                    files: [
                        'Gruntfile.js',
                        '<%= dirs.src %>/**/*.js'
                    ],
                    options: {
                        'bitwise': true,
                        'camelcase': true,
                        'curly': true,
                        'eqeqeq': true,
                        'es3': false,
                        'forin': true,
                        'freeze': true,
                        'immed': true,
                        'indent': 4,
                        'latedef': 'nofunc',
                        'newcap': true,
                        'noarg': true,
                        'noempty': true,
                        'nonbsp': true,
                        'nonew': true,
                        'plusplus': false,
                        'quotmark': 'single',
                        'undef': true,
                        'unused': false,
                        'strict': false,
                        'maxparams': 10,
                        'maxdepth': 5,
                        'maxstatements': 40,
                        'maxcomplexity': 8,
                        'maxlen': 120,

                        'asi': false,
                        'boss': false,
                        'debug': false,
                        'eqnull': true,
                        'esnext': false,
                        'evil': false,
                        'expr': false,
                        'funcscope': false,
                        'globalstrict': false,
                        'iterator': false,
                        'lastsemic': false,
                        'laxbreak': false,
                        'laxcomma': false,
                        'loopfunc': true,
                        'maxerr': false,
                        'moz': false,
                        'multistr': false,
                        'notypeof': false,
                        'proto': false,
                        'scripturl': false,
                        'shadow': false,
                        'sub': true,
                        'supernew': false,
                        'validthis': false,
                        'noyield': false,

                        'browser': true,
                        'node': true,

                        'globals': {
                            'angular': false,
                            '$': false
                        }
                    }
                },

                sass: {
                    /* Compile sass with the most informations */
                    dev: {
                        options: {
                            sourcemap: 'inline',
                            style: 'expanded',
                            debugInfo: true
                        },
                        files: {
                            '<%= dirs.dest %>/style.css': ['<%= dirs.src %>/app/style.scss']
                        }
                    },
                    /* Compress sass files in one stylesheet without sourcemap */
                    prod: {
                        options: {
                            sourcemap: 'none',
                            style: 'compressed'
                        },
                        files: {
                            '<%= dirs.dest %>/style.css': ['<%= dirs.src %>/app/style.scss']
                        }
                    }
                },

                uglify: {
                    options: {
                        banner: '<%= banner %>\n',
                        stripBanners: false
                    },
                    appJS: {
                        files: {
                            '<%= dirs.dest %>/script.app.js': ['<%= concat.app_js.dest %>']
                        }
                    }
                },

                watch: {
                    files: 'source/**/*',
                    tasks: ['default']
                }
            });
    };
})();
