goog.provide("prism.theme.builder.ui.UIRenderer");

goog.require("goog.ui.ControlRenderer");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @extends {goog.ui.ControlRenderer}
 */
prism.theme.builder.ui.UIRenderer = function() {
	goog.ui.ControlRenderer.call(this);
}
goog.inherits(prism.theme.builder.ui.UIRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(prism.theme.builder.ui.UIRenderer);
/**
 * 
 */
prism.theme.builder.ui.UIRenderer.prototype.getClassNames = function() {
	return ["Builder-UI"];
};