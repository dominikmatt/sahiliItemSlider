module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true
        },
        files: {
          'js/script.min.js': [
            'js/client/*.js',
          ]
        }
      }
    },
    
    compass: {
      dist: {
        options: {
          sassDir: 'css/scss',
          cssDir: 'css/css',
          outputStyle: 'compressed'
        }
      }
    },
    
    watch: {
        files: ['css/scss/*.scss', 'js/client/*.js'],
        tasks: ['uglify:dev', 'compass']
    },
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', 'jshint');


};