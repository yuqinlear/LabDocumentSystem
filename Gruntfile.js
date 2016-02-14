/**
 * Created by paul on 2/5/16.
 */

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    path: {
      app: 'src/app',
      server: 'src/server',
      build: 'build'
    },

    jshint: {
      frontend: {
        src: ['<%= path.app %>/**/*.js']
      },
      node: {
        src: ['Gruntfile.js', '<%= path.server %>/**/*.js'],
        jshintrc: '<%= path.server %>/.jshintrc'
      }
    },

    jscs: {
      main: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    concat: {
      options: {
        sourceMap: true
      },
      jsDev: {
        src: ['<%= path.app %>/**/*.js'],
        dest: '<%= path.build %>/js/labDoc.js'
      },
      cssDev: {
        src: ['<%= path.app %>/**/*.css'],
        dest: '<%= path.build %>/css/labDoc.css'
      }
    },

    wiredep: {
      target: {
        src: ['src/app/index.html', 'karma.conf.js'],
        overrides: {
          bootstrap: {
            main: [
              'less/bootstrap.less',
              'dist/css/bootstrap.css',
              'dist/js/bootstrap.js'
            ]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', [
    'jshint:frontend',
    'jshint:node',
    'jscs',
    'concat',
    'wiredep'
  ]);

};
