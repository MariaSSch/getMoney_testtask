const gulp 			= require('gulp');
const sass 			= require('gulp-sass')(require('sass'));
const browserSync 	= require('browser-sync').create();
const imagemin 		= require('gulp-imagemin');
const pngquant 		= require('imagemin-pngquant');
const uglify		= require('gulp-uglifyjs');
const cache 		= require('gulp-cache');
const clean 		= require('gulp-clean');
const autoprefixer	= require('gulp-autoprefixer');
const pug 			= require('gulp-pug');


//sass+
gulp.task('sass', ()=>{ // Создаем таск "sass"
	return gulp.src(['src/sass/main.sass', '!src/sass/styles/**/*.sass']) // Берем источник !=> если будет несколько результирующих sass-файлов, нодо изменить на 'src/sass/**/*.sass'
				.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
				.pipe(autoprefixer({cascade: true}))
				.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
				.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

//js+
gulp.task('script', ()=>{
	return gulp.src(['src/js/**/*.js'])
				.pipe(gulp.dest('dist/js'))
})

//img+
gulp.task('img', ()=>{
	return gulp.src('src/img/**/*')
				.pipe(cache(imagemin({
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
				})))
				.pipe(gulp.dest('dist/img'))
});

//pug
gulp.task('pug-compile', ()=>{
	return gulp.src(['src/pug/**/*.pug', '!src/pug/includes/**/*.pug', '!src/pug/components/**/*.pug'])
	  .pipe(pug({pretty:true}))
	  .pipe(gulp.dest('src'))
  });

//html+
gulp.task('code', ()=>{
	return gulp.src('src/*.html')
				.pipe(browserSync.reload({stream: true}))
});


//browsers+
gulp.task('browser-sync', ()=> {
	browserSync.init({ //fixed + .init
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

//clear cache
gulp.task('clear', ()=>{
	return cache.clearAll();
});

//clean /dist
gulp.task('clean', ()=>{
	return gulp.src('dist', {allowEmpty: true})
				.pipe(clean());
});

//prebuild+
gulp.task('prebuild', async ()=>{
	let buildCSS 	= gulp.src(['src/css/main.sass', "src/fa/css/all.min.css"]).pipe(gulp.dest('dist/css'));
	let buildFonts 	= gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
	let buildJS 	= gulp.src(['src/js/**/*', "src/fa/js/all.min.js"]).pipe(uglify()).pipe(gulp.dest('dist/js'));
	let buildHTML 	= gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

//watch+
gulp.task('watch',()=>{
	gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('src/pug/**/*.pug', gulp.parallel('pug-compile'));
	gulp.watch('src/*.html', gulp.parallel('code'));
	gulp.watch(['src/js/**/*.js', "src/fa/js/all.min.js"], gulp.parallel('script'));
  });

//default+
gulp.task('default', gulp.parallel('sass', 'script', 'browser-sync', 'watch')); //code нет в примере

//build+
gulp.task('build', gulp.series('clean', 'prebuild', 'img', 'sass', 'script'));//para que sass & scripts

