var tslint = require("gulp-tslint"),
    gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    sourcemaps = require("gulp-sourcemaps");
del = require('del');

const TYPE_SCRIPT_FILES = ["./**/*.ts"];
const LIBRARY_TYPE_SCRIPT_DEFINITION = './typings/globals/**/*.ts';

gulp.task('ts-lint', function () {
    return gulp.src(TYPE_SCRIPT_FILES)
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report())
});

gulp.task('clean:out', function () {
    return del([
        'out/**/*'
    ]);
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {

    return tsProject.src()
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("out"))
});


gulp.task('default', ['clean:out', 'compile-ts']);
gulp.task('ci', ['clean:out', 'ts-lint', 'compile-ts']);
