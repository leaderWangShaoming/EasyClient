module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    includereplace : {
      main : {
        expand : true,
        cwd : "./",
        src : ["*.html","!common.html","!header.html","!footer.html"],
        dest : "./dist/"
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS : true,
        minifyCSS : true
      },
      main: {
          expand : true,
          cwd : "./dist/",
          src : ["*.html"],
          dest : "./dist/"
      }
    },
    copy : {
        main : {
            expand : true,
            cwd : "./",
            src : ["adminlte-2.3.6/**","images/**","crossdomain.xml","favicon.ico","cyberplayer.flash.swf"],
            dest : "./dist/"
        }
    },
    cssmin : {
      main : {
        expand : true,
        cwd : "./css",
        src : ["*.css","!*.min.css"],
        dest : "./dist/css/"
      }
    },
    uglify : {
      main : {
        expand : true,
        cwd : "./js",
        src : ["*.js","!*.min.js"],
        dest : "./dist/js/"
      }
    },
    watch : {
      js : {
        files : ["./js/*.js"],
        tasks : ["uglify"]
      },
      css : {
        files : ["./css/*.css"],
        tasks : ["cssmin"]
      },
      html : {
        files : ["./*.html"],
        tasks : ["includereplace","htmlmin"]
      }
    },
    clean : ["./dist/"]
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',['includereplace','htmlmin','cssmin','uglify']);
  grunt.registerTask('release', ['clean','copy','default']);

};