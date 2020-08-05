module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),/*
        clean: ['min-safe/js/*', 'min-safe/css/*', 'min/*', 'assets/css/app.css*'],*/
        clean: {
            js: ['min-safe/js/*', 'min/*.js'],
            css: ['min-safe/css/*', 'min/*.css', 'assets/css/app.css']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            js: {
                files: {
                    './min-safe/js/ss1.js': ['./assets/js/*.js'],
                    './min-safe/js/ss2.js': [
                        './app/app.route.js',
                        './app/shared/config.service.js',
                        './app/shared/services.js',
                        './app/shared/directives.js',
                        './app/shared/filters.js',
                        './app/shared/factories.js',
                        './app/components/app.ctrl.js'
                    ]
                }
            }
        },        
        sass: {                                  // Task
            dist: {                              // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    './assets/css/app.css': './assets/scss/user.scss'      // 'destination': 'source'
                }
            }
        },
        concat: {
            js: {
                src: ['./min-safe/js/*.js'],
                dest: './min/app.js'
            },
            css: {
                src: ['./assets/css/*.css'],
                dest: './min-safe/css/user.css'
            }
        },
        uglify: {
            options: {
            },
            js: {
                src: ['./min/app.js'],
                dest: './min/app.min.js'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            files: {                
                expand: true,
                cwd: './min-safe/css/',
                src: ['user.css'],
                dest: './min/',
                ext: '.min.css'
            }
        },
        watch: {
            css: {
                files: ['./assets/scss/user.scss'],
                tasks: ['clean:css', 'sass', 'concat:css', 'cssmin']
            },
            js: {
                files: [
                    './assets/js/*.js',
                    './app/app.route.js',
                    './app/shared/config.service.js',
                    './app/shared/services.js',
                    './app/shared/directives.js',
                    './app/shared/filters.js',
                    './app/shared/factories.js',
                    './app/components/app.ctrl.js'
                ],
                tasks: ['clean:js', 'ngAnnotate', 'concat:js', 'uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //register grunt default task
    grunt.registerTask('default', ['clean', 'ngAnnotate', 'sass', 'concat', 'uglify', 'cssmin', 'watch']);
};
