'use strict';
module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json')
  var name = pkg.name
  var version = pkg.version
  var dir = {
    src: 'src',
    dist: 'dist'
  }

  grunt.initConfig({


    concat: {
      options: {
        separator: '\n',
      },
      static_mappings: {
        files: [
          {src: [ dir.src+"/**/*.js" ], dest: dir.dist+'/lib/blue.js'},
        ],
      },
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'require']
        }
        // compress: false,
        // beautify: true
      },
      a: {
        options: {
          mangle: {
            except: ['jQuery', 'require']
          }
          // compress: false,
          // beautify: true
        },
        files: [
          {src: [ dir.dist+'/lib/blue.js' ], dest:  dir.dist+'/lib/blue.min.js',},
        ],
      },

      c: {
        options: {
          // mangle: false,
          // compress: false,
          beautify: false
        },
        files: [
          // {
          //   src: [ dir.src+"main.js" ], 
          //   dest:  dir.dist+'main.js'
          // },
        ],
      },

    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat', 'uglify']);
};

