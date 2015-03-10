goog.provide("prism.theme.builder.ui.PaletteRenderer");

goog.require("goog.ui.ContainerRenderer");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @extends {goog.ui.ControlRenderer}
 */
prism.theme.builder.ui.PaletteRenderer = function() {
	goog.ui.ContainerRenderer.call(this);
}
goog.inherits(prism.theme.builder.ui.PaletteRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(prism.theme.builder.ui.PaletteRenderer);

/**
 * 
 */
prism.theme.builder.ui.PaletteRenderer.prototype.getClassNames = function() {
	return ["Builder-PaletteWrapper"];
};

/** @override */
prism.theme.builder.ui.PaletteRenderer.prototype.createDom = function(pallete) {
	// Create and return DIV wrapping contents.
	var element = pallete.getDomHelper().createDom('div',
			this.getClassNames(pallete).join(' '),
			[ pallete.getHeaderContent(), pallete.getContent() ]);

	return element;
};