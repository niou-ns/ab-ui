/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      less: {
        files: 'stylesheets/**/*.less',
        tasks: ['less:compileCore']
      },
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'stylesheets/ab.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
    },
    copy: {
      images: {
        expand: true,
        flatten: true,
        cwd: 'extras/img/',
        src: '**',
        dest: 'dist/img/'
      },
      fonts: {
        expand: true,
        flatten: false,
        cwd: 'fonts/',
        src: ['**', '*/*'],
        dest: 'dist/fonts/'
      },
      bootstrapFonts : {
        expand: true,
        flatten: true,
        cwd: 'bootstrap/fonts/',
        src: '**',
        dest: 'dist/fonts/'
      },
      jsExtras: {
        expand: true,
        flatten: true,
        cwd: 'extras/js/',
        src: '*/*',
        dest: 'dist/js/'
      },
      jsBootstrap: {
        expand: true,
        flatten: true,
        cwd: 'bootstrap/dist/js/',
        src: 'bootstrap.min.js',
        dest: 'dist/js/'
      },
      resourceBundle: {
        expand: true,
        cwd: 'dist',
        src: ['*/*', '*/*/*'],
        dest: '../sfdc/ab-des/resource-bundles/AB_ui.resource/'
      },
      resourceBundleUAT: {
        expand: true,
        cwd: 'dist',
        src: ['*/*', '*/*/*'],
        dest: '../sfdc/AB_UAT/resource-bundles/AB_ui.resource/'
      }
    },
    clean : {
      dist: 'dist',
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify', 'less', 'copy']);
  grunt.registerTask('copyAssets', ['copy:fonts', 'copy:bootstrapFonts', 'copy:jsExtras', 'copy:jsBootstrap', 'copy:images'])
  grunt.registerTask('dist', ['clean:dist', 'less:compileCore', 'copyAssets']);
  grunt.registerTask('deploy', ['dist', 'copy:resourceBundle']);
  grunt.registerTask('deployUAT', ['dist', 'copy:resourceBundleUAT']);

};
