window.jQuery = require 'jquery'

require '../bower_components/normalize-css/normalize.css'
require '../style/layout'

m = require 'mithril'

jQuery ->
	m.render document.getElementById('container'), m('h1', 'Welcome to <%= title %>')