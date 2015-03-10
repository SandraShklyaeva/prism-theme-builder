goog.provide("prism.theme.builder.CodeBlockTokenStyle");

goog.require("prism.theme.builder.TokenStyle");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @extends {prism.theme.builder.TokenStyle}
 */
prism.theme.builder.CodeBlockTokenStyle = function() {
	prism.theme.builder.TokenStyle.call(this, null, null, null);
}
goog.inherits(prism.theme.builder.CodeBlockTokenStyle, prism.theme.builder.TokenStyle);