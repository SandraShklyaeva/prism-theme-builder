goog.provide("prism.theme.builder.model.style.PixelStyle");

goog.require("prism.theme.builder.model.style.Style");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {*}
 *            value
 * @extends {prism.theme.builder.model.style.Style}
 */
prism.theme.builder.model.style.PixelStyle = function(value) {
	prism.theme.builder.model.style.Style.call(this, value);
}
goog.inherits(prism.theme.builder.model.style.PixelStyle,
		prism.theme.builder.model.style.Style);

/**
 * 
 */
prism.theme.builder.model.style.PixelStyle.prototype.toCSS = function() {
	var css = prism.theme.builder.model.style.PixelStyle.superClass_.toCSS
			.call(this);
	return css + "px";
};