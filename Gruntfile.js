"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        less: {
            compile: {
                options: {
                    compress: true
                },
                files: {
                    'public/css/main.css': ['src/less/main.less']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/app/templates/*.html'], dest: 'public/js/templates', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/app',
                    src: '**/*.js',
                    dest: 'public/js'
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['less', 'uglify', 'copy']);
    grunt.registerTask('styles', ['less']);

};