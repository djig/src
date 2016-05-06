var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var revDel = require('rev-del');
var del = require('del');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var purify = require('gulp-purifycss');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');
var karma = require('gulp-karma');

/*ForJavascript Folder and sub folder Excluding Vendor Folder.
Dependency on Cleaning and loading partials */
gulp.task("assetsJS",['clean','partials'],  function(cb){
var manifest = gulp.src(["./dest/partials/rev-manifest.json"]);
  return gulp.src([  '!./src/js/Vendor',
                    '!./src/js/Vendor/**',
                    './src/js/**/*.js',
                    './src/js/*.js'
                  ])
    .pipe(rev()).pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('./dest/js/'))
    .pipe(rev.manifest('rev-manifest.json'))
    .pipe(gulp.dest('./dest/js/'))
});



//
// gulp.task('karmaTestRunner',['assetsJS'], function() {
//   gulp.src("./src/js/jasmineTest/*.js")
//     .pipe(karma({
//       configFile: 'ddApp.conf.js',
//       action: 'run'
//     }));
// });


// gulp.task('karmaTestRunner', function() {
//   // Be sure to return the stream
//   return   gulp.src([
//     './src/js/Vendor',
//     './src/js/Vendor/**',
//      '!./src/js/Vendor/Highcharts.js',
//      '!./src/js/Vendor/HighCharts-more.js',
//      '!./src/js/Vendor/angular-resource.min.js',
//     './src/js/**/*.js',
//     './src/js/*.js',
//     './src/js/jasmineTest/*.js'
//   ])
//     .pipe(karma({
//       configFile: 'ddApp.conf.js',
//       action: 'run'
//     }))
//     .on('error', function(err) {
//       // Make sure failed tests cause gulp to exit non-zero
//       throw err;
//     });
// });


/*For Javascript Jasmine test */
gulp.task("jasmineTest",['assetsJS'],  function(cb){
// //  cb(err);.pipe(revDel({ dest: './dest/js/' }))
return    gulp.src([ "./src/js/jasmineTest/*.js"])
       .pipe(jasmine());
       //
      //  return gulp.src(['./src/js/jasmineTest/*.js'])
      //     .pipe(watch('./src/js/jasmineTest/*.js'))
      //     .pipe(jasmineBrowser.specRunner())
      //     .pipe(jasmineBrowser.server({port: 8888}));


});






/*For CSS Folder and sub folder Excluding Vendor Folder.
Dependency on Cleaning  */
gulp.task("assetsCSS",['clean'],  function(cb){
//  cb(err);
  return gulp.src([  '!./src/css/Vendor',
                    '!./src/css/Vendor/**',
                    './src/css/**/*.css',
                    './src/css/*.css'
                   ])
    .pipe(rev())
    .pipe(gulp.dest('./dest/css/'))
    .pipe(rev.manifest('rev-manifest.json'))
    .pipe(revDel({ dest: './dest/css/' }))
    .pipe(gulp.dest('./dest/css/'))
});
/*For HTML Files and chaning POinter to Assets(Css,js).   */
gulp.task("htmlRewrite", ['assetsJS','assetsCSS'],  function(cb){
  //cb(err);
  var manifest = gulp.src(["./dest/js/rev-manifest.json","./dest/css/rev-manifest.json"]);
  return gulp.src("./src/*.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('./dest'));
});

 /*For Angualr Partials for Directives and views.   */
gulp.task('partials',['clean'], function(cb) {
//  cb(err);
return    gulp.src("./src/partials/*")
              .pipe(rev())
              .pipe(gulp.dest('./dest/partials/'))
              .pipe(rev.manifest('rev-manifest.json'))
              .pipe(revDel({ dest: './dest/partials/' })).pipe(gulp.dest('./dest/partials'))
});




//Vendor JS Files
gulp.task('vendorJs',['cleanVendor'], function(cb) {
  //cb(err);
return    gulp.src(["./src/js/Vendor/*.js","./src/js/Vendor/**/*.js"]).pipe(uglify())
        .pipe(gulp.dest('./dest/js/Vendor'));
});




//Vendor CSS Files
gulp.task('vendorCSS',['cleanVendor'], function(cb) {
//  cb(err);
return    gulp.src("./src/css/Vendor/*.css")
        .pipe(csso())
        .pipe(purify(['/src/js/*.js','/src/js/**/*.js', './src/*.html','./src/partials/*']))
        .pipe(gulp.dest('./dest/css/Vendor'));

});





//Clenining up all files expect Vendor folders
gulp.task('clean', function(cb) {
   del([ './dest/*.*',
      './dest/js/*.*',
      './dest/css/*.css',
      './dest/css/Vendor/*.*',
      './dest/partials/*.*',
      './dest/js/**/*.*',
      '!./dest/js/Vendor',
       '!./dest/js/Vendor/**'
   ], cb);
  // cb(err);
 });


 gulp.task('cleanVendor', function(cb) {
    del([
         './dest/css/Vendor/*.*',
         './dest/js/vendor/*.*'
    ], cb);
   // cb(err);
  });

 var tasks=[
             // 'clean',
             'assetsJS',
             'assetsCSS',
             'htmlRewrite',
              'partials'
              //,'karmaTestRunner'
             // ,
             // 'jsRewrite'
           ];

var intialtasks=tasks.concat([

  'vendorJs',
  'vendorCSS'
]);

gulp.task('watch', function () {

//set up watch for all changes except Vendor folder
 gulp.watch(['./src/*.*',
           './src/partials/*.*',
           './src/js/*.*',
           './src/js/**/*.*',
           './src/css/*.*',
           './src/css/**/*.*'
         ], tasks);

});

gulp.task('default',['watch' ].concat(intialtasks)) ;
