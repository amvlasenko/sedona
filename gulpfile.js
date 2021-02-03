const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const svgstore = require('gulp-svgstore');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Imgmin

const imgmin = () => {
  gulp.src("testimg/*.jpg")
        .pipe(webp({quality: 50}))
        .pipe(gulp.dest("build/img"))
}

exports.imgmin = imgmin;

// SVG sprite

const sprite = () => {
  gulp.src("source/gram/*.svg")
        .pipe(svgstore())
        .pipe(rename("icons-sprite.svg"))
        .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
