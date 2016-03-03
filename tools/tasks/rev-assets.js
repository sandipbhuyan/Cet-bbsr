import config from '../config';
import gulp from 'gulp';
import path from 'path';
import rev from 'gulp-rev';
import revNapkin from 'gulp-rev-napkin';

const paths = {
  src: path.join(config.DEST_DIR, config.rev.assets.glob),
  dest: config.DEST_DIR,
  manifest: path.join(config.DEST_DIR, config.rev.manifestFile)
};

gulp.task('rev-assets', () => {
  // Ignore files that may reference assets. We'll rev them in another task.
  const ignoreThese = `!${path.join(paths.dest, config.rev.assets.ignoreGlob)}`;

  gulp
    .src([paths.src, ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(paths.dest))
    .pipe(revNapkin({ verbose: false }))
    .pipe(rev.manifest(paths.manifest))
    .pipe(gulp.dest(''));
});