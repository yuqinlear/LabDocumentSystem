/**
 * Created by paul on 2/5/16.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    path: {
      app: 'src/app',
      build: 'build'
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js']
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
      }
    },

    wiredep: {
      target: {
        src: 'src/app/index.html',
        overrides :{
          bootstrap:{
            main:[
              "less/bootstrap.less",
              "dist/css/bootstrap.css",
              "dist/js/bootstrap.js"
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
    'concat',
    'wiredep'
  ]);

};
