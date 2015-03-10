goog.provide("prism.theme.builder.CodeLinesTokenStyle");

goog.require("prism.theme.builder.TokenStyle");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @extends {prism.theme.builder.TokenStyle}
 */
prism.theme.builder.CodeLinesTokenStyle = function() {
	prism.theme.builder.TokenStyle.call(this, null, null, null);
}
goog.inherits(prism.theme.builder.CodeLinesTokenStyle, prism.theme.builder.TokenStyle);