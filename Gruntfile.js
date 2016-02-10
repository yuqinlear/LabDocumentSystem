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
      jsDev: {
        src: ['<%= path.app %>/**/*.js'],
        dest: ['<%= path.build %>/js/docLab.js']
      },
      cssDev: {
        src: ['<%= path.app %>/**/*.css'],
        dest: ['<%= path.build %>/css/docLab.css']
      }
    },

    wiredep: {
      target: {
        src: 'src/app/index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', [
    'concat',
    'wiredep',
  ]);

};
