var generators = require('yeoman-generator');
var mkdirp = require('mkdirp')

module.exports = generators.Base.extend({

  constructor: function(){
    
    generators.Base.apply(this, arguments)

   this.argument('appname', { type: String, required: true });

  },

  installDeps: function(){
    this.bowerInstall(['normalize.css'], { 'saveDev': true });
    this.npmInstall([
      'coffee-script',
      'lodash-node',
      'jquery',
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
      'webpack',
      'coffee-loader',
      'style-loader',
      'css-loader',
      'stylus-loader',
      'mocha',
      'chai'
    ], { 'saveDev': true });
    console.log('install done')
  },

  makeClient: function() {
    mkdirp.sync('public');
    mkdirp.sync('frontend');
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
      this.destinationPath('frontend/app.coffee'),
      { title: this.appname }
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
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
      this.templatePath('first_spec.coffee'),
      this.destinationPath('spec/first_spec.coffee'),
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