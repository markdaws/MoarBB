module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['./bin', './tmp'],
            tmp: ['./tmp']
        },
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: { './bin/moarbb.js': ['./tmp/templates.js', 'src/packages/**/*.js'] }
            },
            prod: {
                files: { './bin/moarbb-<%= pkg.version %>.min.js': ['src/packages/**/*.js', './tmp/templates.js'] }
            }            
        },
        less: {
            dev: {
                files: { './bin/moarbb.css': ['src/packages/**/*.less'] }
            },
            prod: {
                files: { './bin/moarbb-<%= pkg.version %>.min.css': ['src/packages/**/*.less'] },
                options: {
                    compress: true
                }
            }
        },
        jst: {
            options: {
                namespace: 'moarbb.templates',
                processName: function(filename) {
                    return filename.match(/src\/packages\/([^/]*)/)[1];
                }
            },
            foo: {
                files: { './tmp/templates.js': ['src/packages/**/*.html'] }
            }
        },
        concat: {
            options: {
                separator: ';',
                foo: {
                    files: {}
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build-dev', ['clean:tmp', 'jst:foo', 'uglify:dev', 'less:dev', 'clean:tmp']);
    grunt.registerTask('build-prod', ['clean:tmp', 'jst:foo', 'uglify:prod', 'less:prod', 'clean:tmp']);
};