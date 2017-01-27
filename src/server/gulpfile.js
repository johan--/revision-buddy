var tslint = require("gulp-tslint"),
    gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    sourcemaps = require("gulp-sourcemaps");
    
del = require('del');
var gulpSequence = require('gulp-sequence')

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

gulp.task("copy-files", function () {
    gulp.src('./email-templates/**/*')
        .pipe(gulp.dest('./out/services/email-templates'));

    gulp.src('./node_modules/**/*')
        .pipe(gulp.dest('./out/node_modules/'));

    gulp.src('./.env.*')
        .pipe(gulp.dest('./out/'));
});


gulp.task('default', gulpSequence('clean:out', 'compile-ts', 'copy-files'));
gulp.task('ci', gulpSequence('clean:out', 'ts-lint', 'compile-ts'));
