/*
 * grunt-gta
 * https://github.com/ZuBB/grunt-gta
 *
 * Copyright (c) 2014 Vasyl Zuzyak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Unit tests.
        release: {
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-release');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);
};

