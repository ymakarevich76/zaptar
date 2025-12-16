const { series, parallel, src, dest, lastRun, watch } = require('gulp'),
  fileinclude = require('gulp-file-include'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  gulpSass = require('gulp-dart-sass'),
  gcmq = require('gulp-group-css-media-queries'),
  cleancss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  del = require('del'),
  browserSync = require('browser-sync'),
  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  insert = require('gulp-insert'),
  yargs = require('yargs'),
  sassGlob = require('gulp-sass-glob');

const argv = yargs.argv;
const version = argv.ver || 'v1';

///////////////////////////////////////////////////////// path
const path = {
  dist: {
    html: 'dist/',
    font: 'dist/static/font/',
    img: 'dist/static/img/',
    style: 'dist/static/css/',
    script: 'dist/static/js/',
  },

  src: {
    html: [
      '_src/html/*.html',
      `_src/html/${version}/*.html`
    ],
    htmlWatch: '_src/html/**/*.html',
    font: ['_src/static/font/**/*'],
    img: [
      '_src/static/img/**/*.{png,jpg,jpeg,gif,svg,mp4}',
      '!_src/static/img/sprite/**'
    ],
    sprite: '_src/static/img/sprite/*.svg',
    styleLib: '_src/static/style/libs.scss',
    style: '_src/static/style/main.scss',
    styleWatch: [
      '_src/static/style/**/*',
      '!_src/static/style/libs.scss'
    ],
    scriptLib: '_src/static/script/libs.js',
    script: '_src/static/script/main.js',
    scriptWatch: ['_src/static/script/**/*', '!_src/static/script/libs.js']
  },
};

///////////////////////////////////////////////////////// server
const server = () => {
  browserSync({
    server: 'dist',
    notify: true,
  });
};

///////////////////////////////////////////////////////// clean global
const clean = () => {
  return del(path.dist.html);
};

///////////////////////////////////////////////////////// html
const mainMod = version !== 'v1' ? ' main--mt' : '';

const html = () => {
  return src(path.src.html, { allowEmpty: true })
    .pipe(replace('{{MAIN_MOD}}', mainMod))
    .pipe(replace('$version', version)) // если уже используешь версии в include
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        // Устанавливаем значение по умолчанию, чтобы избежать ошибки "is not defined"
        dark: false
      },
    }))
    .pipe(dest(path.dist.html))
    .pipe(browserSync.stream());
};

///////////////////////////////////////////////////////// fonts
const font = () => {
  return src(path.src.font)
    .pipe(dest(path.dist.font));
};

///////////////////////////////////////////////////////// img
const img = () => {
  return src(path.src.img, { since: lastRun(img) })
    .pipe(dest(path.dist.img))
    .pipe(browserSync.stream());
};

///////////////////////////////////////////////////////// sprite
const sprite = () => {
  return src(path.src.sprite)
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
        }
      }
    }))
    .pipe(dest(path.dist.img))
    .pipe(browserSync.stream());
};

///////////////////////////////////////////////////////// css
const cssLib = () => {
  return src(path.src.styleLib)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest(path.dist.style))
    .pipe(browserSync.stream());
};

const css = () => {
  const versionImport = `@import "block/${version}/main-${version}.scss";\n`;

  return src(path.src.style, { sourcemaps: true })
    .pipe(insert.prepend(versionImport))
    .pipe(sassGlob()) // раскрывает импорт в список файлов
    .pipe(gulpSass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(gcmq())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 15 versions'], cascade: false }))
    .pipe(rename({ basename: 'main', suffix: '.min', extname: '.css' }))
    .pipe(dest(path.dist.style, { sourcemaps: true }))
    .pipe(browserSync.stream());
};

const cssBuild = () => {
  const versionImport = `@import "block/${version}/main-${version}.scss";\n`;

  return src(path.src.style)
    .pipe(insert.prepend(versionImport))
    .pipe(sassGlob())
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(gcmq())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 15 versions'], cascade: false }))
    .pipe(cleancss())
    .pipe(rename({ basename: 'main', suffix: '.min', extname: '.css' }))
    .pipe(dest(path.dist.style));
};

///////////////////////////////////////////////////////// js

const jsLib = () => {
  return src(path.src.scriptLib)
    .pipe(fileinclude({
      basepath: '@root'
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.dist.script))
    .pipe(browserSync.stream());
};

const js = () => {
  return src(path.src.script, { sourcemaps: true })
    .pipe(fileinclude())
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.dist.script, { sourcemaps: true }))
    .pipe(browserSync.stream());
};

const jsBuild = () => {
  return src(path.src.script)
    .pipe(fileinclude())
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.dist.script));
}

///////////////////////////////////////////////////////// watcher
const watcher = () => {
  watch(path.src.htmlWatch, html);
  watch(path.src.font, font);
  watch(path.src.img, img);
  watch(path.src.sprite, sprite);
  watch(path.src.styleLib, cssLib);
  watch(path.src.styleWatch, css);
  watch(path.src.scriptWatch, js);
  watch(path.src.scriptLib, jsLib);
};

///////////////////////////////////////////////////////// task
exports.default = series(
  clean,
  parallel(
    html,
    font,
    img,
    sprite,
    cssLib,
    css,
    jsLib,
    js
  ),
  parallel(
    watcher,
    server
  )
);

exports.build = series(
  clean,
  parallel(
    html,
    font,
    img,
    sprite,
    cssLib,
    cssBuild,
    jsLib,
    jsBuild
  )
);

exports.css = css;
exports.cssBuild = cssBuild;
