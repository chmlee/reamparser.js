const gulp = require('gulp');
const concat = require('gulp-concat');

const targetFiles = [
  './grammar.js',
  './mutation.js',
  './action.js',
  './parser.js',
];

gulp.task('scripts', () => {
  const result = gulp.src(targetFiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build'));
  return result;
});
