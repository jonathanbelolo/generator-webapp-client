var generators = require('yeoman-generator');
var mkdirp = require('mkdirp')

module.exports = generators.Base.extend({

  constructor: function(){
    
    generators.Base.apply(this, arguments)

   this.argument('appname', { type: String, required: true });

  },

  install: function(){
    this.bowerInstall(['normalize.css'], {});
    this.npmInstall([
      'coffee-script',
      'lodash-node',
      'jquery',
      'baconjs',
      'mithril',
      'ramda',
      'pointfree-fantasy',
      'data.task',
      'data.maybe',
      'data.either',
      'stylus',
      'jeet',
      'rupture',
      'autoprefixer-stylus',
      'jade',
      'bower',
      'gulp',
      'gulp-jade',
      'gulp-mocha',
      'gulp-webpack-build',
      'webpack',
      'coffee-loader',
      'style-loader',
      'css-loader',
      'stylus-loader',
      'mocha',
      'chai'
    ], { 'saveDev': true });
  },

  makeClient: function() {
    mkdirp.sync('public');
    mkdirp.sync('lib');
    mkdirp.sync('spec');
    mkdirp.sync('style');
    mkdirp.sync('jade');

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: this.appname }
    )
    
    this.fs.copyTpl(
      this.templatePath('app.coffee'),
      this.destinationPath('lib/app.coffee'),
      { title: this.appname }
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('lib/webpack.config.js'),
      {}
    )

    this.fs.copyTpl(
      this.templatePath('index.jade'),
      this.destinationPath('jade/index.jade'),
      { title: this.appname }
    )

    this.fs.copyTpl(
      this.templatePath('layout.styl'),
      this.destinationPath('style/layout.styl'),
      { title: this.appname }
    )

    this.fs.copyTpl(
      this.templatePath('first_spect.coffee'),
      this.destinationPath('spec/first_spect.coffee'),
      { title: this.appname }
    )


    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {}
    )

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      {}
    )

  }

});