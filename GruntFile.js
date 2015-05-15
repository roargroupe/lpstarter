module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'includes/production/js/production.js',
        dest: 'includes/production/js/production.min.js'
      }
    },
    concat: {
      // configuration for concatinating files goes here.
      dist: {
        src: [
          'includes/dev/js/vendor/*.js', //all libraries folder
          'includes/dev/js/*.js' // all other files in the js file
        ],
        dest: 'includes/production/js/production.js',
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'includes/dev/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'includes/production/images/'
        }]
      }
    },
    css: {
      files: ['css/*.scss', 'css/*'],
      tasks: ['sass'],
      options: {
        spawn: false,
      }
    },
    sass: {
      dist: {
        files: {
          'includes/production/css/main-unprefixed.css': 'includes/dev/sass/main.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 80 versions', 'ie 9']
        },
        files: {
          'includes/production/css/main.css': 'includes/production/css/main-unprefixed.css'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['includes/dev/js/*.js', 'includes/dev/images', 'includes/dev/js/*.js', 'includes/dev/js/vendor/*.js', 'includes/dev/sass/*.scss'],
        tasks: ['concat', 'uglify', 'sass','imagemin', 'autoprefixer','cssmin','clean'],
        options: {
          spawn: false,
        }
      }
    },
    connect: {
      server:{
        options: {
          port: 9000,
          livereload: 35729
        }
      }
    },
    open : {
      dev : {
        path: 'http://localhost:9000',
        app: 'Google Chrome'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'includes/production/css',
          src: ['*.css', '!*.min.css'],
          dest: 'includes/production/css',
          ext: '.min.css'
        }]
      }
    },
    clean: {
      css: ['includes/production/css/*.css','!includes/production/css/*.min.css','includes/production/css/main-unprefixed.*.*'],
      js: ['includes/production/js/production.js']
    }
    
  });
 
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  // Set default task
  grunt.registerTask('default', ['connect','open','watch']);
  
  // Set build
  grunt.registerTask('build', ['concat','uglify','sass','imagemin','autoprefixer','cssmin','clean']);
};