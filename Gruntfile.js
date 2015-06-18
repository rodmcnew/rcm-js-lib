module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                dist : {
                    options: {
                        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                        mangle: false,
                        sourceMap: true
                    },
                    files: {
                        'dist/<%= pkg.name %>.min.js': [
                            'src/rcm-guid.js',
                            'src/rcm-event-manager.js',
                            'src/angular-rcm-js-lib.js',
                            'src/angular-rcm-guid.js',
                            'src/angular-rcm-event-manager.js'
                        ],
                        'dist/rcm-guid.min.js': [
                            'src/rcm-guid.js'
                        ],
                        'dist/rcm-event-manager.min.js': [
                            'src/rcm-event-manager.js'
                        ],
                        'dist/angular-<%= pkg.name %>.min.js': [
                            'src/angular-rcm-js-lib.js',
                            'src/angular-rcm-guid.js',
                            'src/angular-rcm-event-manager.js'
                        ]
                    }
                }
            },
            concat: {
                options: {
                },
                dist: {
                    files: {
                        'dist/<%= pkg.name %>.js': [
                            'src/rcm-guid.js',
                            'src/rcm-event-manager.js',
                            'src/angular-rcm-js-lib.js',
                            'src/angular-rcm-guid.js',
                            'src/angular-rcm-event-manager.js'
                        ],
                        'dist/rcm-guid.js': [
                            'src/rcm-guid.js'
                        ],
                        'dist/rcm-event-manager.js': [
                            'src/rcm-event-manager.js'
                        ],
                        'dist/angular-<%= pkg.name %>.js': [
                            'src/angular-rcm-js-lib.js',
                            'src/angular-rcm-guid.js',
                            'src/angular-rcm-event-manager.js'
                        ]
                    }
                }
            }
        }
    );

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat']);
};
