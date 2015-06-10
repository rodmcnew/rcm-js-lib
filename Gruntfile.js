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
                        sourceMap: true,
                        sourceMapName: 'dist/<%= pkg.name %>.map'
                    },
                    files: {
                        'dist/<%= pkg.name %>.min.js': [
                            'src/rcm-guid.js',
                            'src/rcm-event-manager.js'
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
                            'src/rcm-event-manager.js'
                        ]
                    }
                }
            },
            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: 'rcm-guid.js',
                            dest: 'dist'
                        },
                        {
                            expand: true,
                            cwd: 'src',
                            src: 'rcm-event-manager.js',
                            dest: 'dist'
                        }
                    ]
                }
            }
        }
    );

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat', 'copy']);
};
