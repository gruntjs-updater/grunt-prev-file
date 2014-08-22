/*
 * grunt-prev-file
 * https://github.com/ZuBB/grunt-prev-file
 *
 * Copyright (c) 2015 Vasyl Zuzyak
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    grunt.registerMultiTask('prev_file', function() {
        var destFilenames = this.data._destFilenames = [];
        var configKeyBase = this.name + '.' + this.target;
        var createMethodKey = configKeyBase + '.createFilename';

        grunt.config(configKeyBase + '.getLastDestFile', function() {
            return destFilenames
                .filter(function(filepath) {
                    return grunt.file.exists(filepath);
                })
                .slice(-1)
                .pop();
        });

        grunt.config(configKeyBase + '.getNewDestFile', function(params) {
            var createMethod = grunt.config(createMethodKey);

            if (typeof createMethod !== 'function') {
                grunt.fail.fatal('`createMethod` option required');
            }

            var newFilename = createMethod(params);

            if (destFilenames.indexOf(newFilename) < 0) {
                destFilenames.push(newFilename);
            }

            return newFilename;
        });
    });
};

