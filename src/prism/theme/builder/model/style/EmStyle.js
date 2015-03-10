goog.provide("prism.theme.builder.model.style.EmStyle");

goog.require("prism.theme.builder.model.style.Style");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @param {*} value
 * @extends {prism.theme.builder.model.style.Style}
 */
prism.theme.builder.model.style.EmStyle = function(value) {
	prism.theme.builder.model.style.Style.call(this,value);
}
goog.inherits(prism.theme.builder.model.style.EmStyle, prism.theme.builder.model.style.Style);

/**
 * 
 */
prism.theme.builder.model.style.EmStyle.prototype.toCSS = function() {
	var css = prism.theme.builder.model.style.PixelStyle.superClass_.toCSS
			.call(this);
	return css + "em";
};