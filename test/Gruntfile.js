/**
 * Grunt Template
 */
module.exports = function(grunt) {
  grunt.initConfig({

    /* ! Liquify */
    
    liquify: {
      options: {
        data: {
          greeting: "Hello",
          config: {name: "Bro"}
        },
        dataDirectory: 'data'
      },
      a: {
        src: "dist/A.js",
        dest: "dist/A2.js"
      },
      b: {
        src: "dist/B.js",
        dest: "dist/B2.js"
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