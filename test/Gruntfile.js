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
        src: "src/A.js",
        dest: "dist/A.js"
      },
      b: {
        src: "src/B.js",
        dest: "dist/B.js"
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