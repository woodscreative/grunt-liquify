'use strict';
const fs = require('fs');
const path = require('path');
const recursive = require("recursive-readdir");
const merge = require('deepmerge');
const Liquid = require('liquidjs');
const engine = new Liquid();
module.exports = grunt => {
  var options;
	grunt.registerMultiTask('liquify', 'Liquify assets', function () {
  	
    options = this.options({
      // the optional path to a data directory to pass to liquid
      dataDirectory: null,
      // the optional data object to pass to liquid (merged with dataDirectory)
      data: null
    });
    
    const done = this.async();

		// liquid data
    var data = {};
    
    // the files
    var files = this.files;
    
    /**
     * Parse data
     */
    async function parseData(){
      // if not defined skip...
      if (!options.dataDirectory){
        return;
      }
      // check data source exists and is a directory...
      if (!grunt.file.isDir(options.dataDirectory)){
        grunt.fail.fatal(`${options.dataDirectory} is not a directory or does not exist.`);
        return;
      }
      // parse all data...
      return recursive(options.dataDirectory).then(
        function(files) {
          files.forEach(function(f) {
            // ignore files starting with dot
            if (path.basename(f).startsWith(".")){
              return;
            }
            var k = path.basename(f, path.extname(f));
            data[k] = require(path.resolve(f));
            console.log("Parsing data in ", f);
          })
        }
      );
    }
    
    /**
     * Parse liquid
     */
    async function parseLiquid(){
      files.forEach(async function(f) {
        f.src.map(async filepath => {
          // if no destination is defined use/overwrite src
          var dest = f.dest || filepath;
          // check src file exists?..
          if (grunt.file.exists(filepath)){
            var rawContent = grunt.file.read(filepath);
            console.log("Parsing liquid in ", filepath);
            // parse liquid...
            var liquidParsed = await engine
              .parseAndRender(rawContent, data)
              .then((r) => {
                // save file...
                grunt.file.write(dest, r);
              });
          } else {
            grunt.log.warn(`Source file ${filepath} does not exist!`);
          }
        });
      });
    }
    
    // Perform task(s)...
    var task = (async () => {
      var r = await parseData();
      // now merge data...
      if (options.data){
        data = merge(data, options.data);
      }
      r = await parseLiquid();
    })().then(() => {
      grunt.log.ok("Liquify complete.");
      done();
    });
    
	});
};
