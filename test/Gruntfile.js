/**
 * Grunt Template
 */
module.exports = function(grunt) {
  grunt.initConfig({

    /* ! Liquify */
    
    liquify: {
      options: {
        data: {
          greeting: 'Hello',
          config: {name: 'Bro'}
        },
        dataDirectory: 'data'
      },
      all: {
        cwd: 'src',
        src: '**/*.js',
        dest: 'dist',
        expand: true
      }
    }
   
  });
  
  /* ! Tasks */
   
  grunt.loadNpmTasks('grunt-liquify');
  grunt.registerTask('default', function() {
    grunt.task.run([
      'liquify'
    ]);
  });

};