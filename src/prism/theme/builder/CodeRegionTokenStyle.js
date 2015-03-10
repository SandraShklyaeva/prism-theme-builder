goog.provide("prism.theme.builder.CodeRegionTokenStyle");

goog.require("prism.theme.builder.TokenStyle");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @extends {prism.theme.builder.TokenStyle}
 */
prism.theme.builder.CodeRegionTokenStyle = function() {
	prism.theme.builder.TokenStyle.call(this, null, null, null);
}
goog.inherits(prism.theme.builder.CodeRegionTokenStyle, prism.theme.builder.TokenStyle);