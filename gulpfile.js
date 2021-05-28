const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const del = require('del');
const fileinclude = require('gulp-file-include');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');

const Undertaker = require('undertaker');

// Таск для сборки HTML и шаблонов
gulp.task('html', function() {
	return gulp.src('./src/html/*.html')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'HTML include',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( fileinclude({ prefix: '@@' }) )
		.pipe( gulp.dest('./build/') )
});

gulp.task('styles', function() {
	return gulp.src('./src/sass/**/*.+(scss|sass)')
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError)) 
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./build/css/') )
		.pipe( browserSync.stream() )
});

gulp.task('copy:img', function() {
	return gulp.src('./src/img/**/*.*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('./build/img/'))
});

gulp.task('copy:js', function() {
	return gulp.src('./src/js/**/*.*')
	  .pipe(gulp.dest('./build/js/'))
});

gulp.task('copy:css', function() {
	return gulp.src('./src/css/**/*.*')
	  .pipe(gulp.dest('./build/css/'))
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch("./build/*.html").on('change', browserSync.reload);
});

gulp.task('watch', function() {   
	gulp.watch('./src/html/**/*.html', gulp.parallel('html'))
    gulp.watch("./src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
	gulp.watch("./src/css/**/*.*").on('all', gulp.parallel('copy:css'));
    gulp.watch("./src/js/**/*.*").on('change', gulp.parallel('copy:js'));
    gulp.watch("./src/img/**/*.*").on('all', gulp.parallel('copy:img'));    

    gulp.watch(
            ["./build/js/**/*.*", "./build/css/**/*.*", "./build/img/**/*.*"] 
        ).on('all', browserSync.reload);

});


gulp.task('clean:build', function() {
	return del('./build')
});

gulp.task(
    'default', 
    gulp.series( 
        gulp.parallel('clean:build'),
        gulp.parallel('styles', 'html', 'copy:css', 'copy:img', 'copy:js'), 
        gulp.parallel('browser-sync', 'watch'), 
        )
);