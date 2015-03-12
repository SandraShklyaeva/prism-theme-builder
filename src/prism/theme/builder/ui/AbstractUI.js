goog.provide("prism.theme.builder.ui.AbstractUI");
goog.provide("prism.theme.builder.ui.AbstractUI.EventType");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.fx.Transition.EventType");
goog.require("goog.fx.dom.FadeInAndShow");
goog.require("goog.fx.dom.FadeOutAndHide");
goog.require("goog.ui.Control");
goog.require("prism.theme.builder.ui.UIRenderer");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @abstract
 * @param {goog.ui.ControlContent}
 *            opt_content
 * @param {goog.ui.ControlRenderer}
 *            opt_renderer
 * @param {goog.dom.DomHelper}
 *            opt_domHelper
 * @extends {goog.ui.Control}
 */
prism.theme.builder.ui.AbstractUI = function(opt_content, opt_renderer,
		opt_domHelper) {
	goog.ui.Control.call(this, opt_content, opt_renderer
			|| prism.theme.builder.ui.UIRenderer.getInstance(), opt_domHelper);
	this.palette = null;
	this.setAllowTextSelection(true);
}
goog.inherits(prism.theme.builder.ui.AbstractUI, goog.ui.Control);

/**
 * Constants for event names.
 * 
 * @enum {string}
 */
prism.theme.builder.ui.AbstractUI.EventType = {
	SHOWN : 'BuilderUIShown',
	HIDDEN : 'BuilderUIHidden'
};

/**
 * @return {goog.ui.Container} the palette
 */
prism.theme.builder.ui.AbstractUI.prototype.getPalette = function() {
	return this.palette;
};

/**
 * 
 */
prism.theme.builder.ui.AbstractUI.prototype.update = function() {
};

/**
 * @param {Boolean}
 *            animate
 */
prism.theme.builder.ui.AbstractUI.prototype.show = function(animate) {
	this.render();
	if (!animate) {
		this.update();
		goog.style.setOpacity(this.getElement(), 1);
		goog.style.setElementShown(this.getElement(), true);
		this.dispatchEvent(prism.theme.builder.ui.AbstractUI.EventType.SHOWN);
	} else {
		this.update();
		var fadeIn = new goog.fx.dom.FadeInAndShow(this.getElement(), 500);
		goog.events
				.listen(
						fadeIn,
						goog.fx.Transition.EventType.END,
						function(e) {
							this
									.dispatchEvent(prism.theme.builder.ui.AbstractUI.EventType.SHOWN);
						}, false, this);
		fadeIn.play();
	}
};

prism.theme.builder.ui.AbstractUI.prototype.hide = function(animate) {
	if (!animate) {
		goog.style.setOpacity(this.getElement(), 0);
		goog.style.setElementShown(this.getElement(), false);
		this.dispatchEvent(prism.theme.builder.ui.AbstractUI.EventType.HIDDEN);
	} else {
		var fadeOut = new goog.fx.dom.FadeOutAndHide(this.getElement(), 500);
		goog.events
				.listen(
						fadeOut,
						goog.fx.Transition.EventType.END,
						function(e) {
							this
									.dispatchEvent(prism.theme.builder.ui.AbstractUI.EventType.HIDDEN);
						}, false, this);
		fadeOut.play();
	}
};