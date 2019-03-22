README
======

A [Grunt](https://gruntjs.com) task to process Liquid using [liquidjs](https://www.npmjs.com/package/liquidjs).

### Installation

```
npm install grunt-liquify
```

### Grunt Task

Inside `Gruntfile.js`.
 
```
module.exports = function(grunt) {
  grunt.initConfig({
    liquify: {
      options: {
        dataDirectory: 'data',
        data: {foo: 'bar'}
      },
      example1: {
        // liquify and overwrite existing file(s)
        src: "dist/*.js"
      },
      example2: {
        // liquify and output to a new file
        src: "dist/script.js",
        dest: "dist/script.done.js"
      }
    }
  });
  grunt.loadNpmTasks('grunt-liquify');
  grunt.registerTask('default', function() {
    grunt.task.run([
      'liquify'
    ]);
  });
};
```


### Options

| Tag          	|   type 	| default 	| description                                                                                               	|
|--------------	|-------:	|---------	|-----------------------------------------------------------------------------------------------------------	|
| dataDirectory 	| string 	| null    	| optional path to a directory that contains js data to be imported using the node `require` method. 	|
| data         	| object 	| null    	| optional object to pass to liquid. This data has a higher priority than `dataDirectory`.        	|

#### Data

All data is deep merged and must be compatible with the node [require](https://nodejs.org/api/modules.html#modules_require_id) method. The filename is used as the object key. The final `data` object is then passed to all liquid templates.

For example this data directory:

```
data
  ├── config.js
  └── foo.js
```

will produce

```
{
  config: {},
  foo: {}
}
```