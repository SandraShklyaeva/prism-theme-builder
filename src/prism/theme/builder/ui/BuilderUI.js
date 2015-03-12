goog.provide("prism.theme.builder.ui.BuilderUI");

goog.require("goog.dom.classlist");
goog.require("prism.theme.builder.ui.AbstractUI");
goog.require("prism.theme.builder.ui.BuilderPalette");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {goog.ui.ControlRenderer}
 *            opt_renderer
 * @param {goog.dom.DomHelper}
 *            opt_domHelper
 * @extends {prism.theme.builder.ui.AbstractUI}
 */
prism.theme.builder.ui.BuilderUI = function(builder, opt_renderer,
		opt_domHelper) {
	prism.theme.builder.ui.AbstractUI.call(this, null, opt_renderer,
			opt_domHelper);
	this.builder = builder;
	this.palette = new prism.theme.builder.ui.BuilderPalette(this.builder);
}
goog.inherits(prism.theme.builder.ui.BuilderUI,
		prism.theme.builder.ui.AbstractUI);

/**
 * 
 */
prism.theme.builder.ui.BuilderUI.prototype.update = function() {
	this.palette.init();
};

/**
 * 
 */
prism.theme.builder.ui.BuilderUI.prototype.render = function(element) {
	if (!this.isInDocument()) {
		if (element == null) {
			element = document.body;
		}
		prism.theme.builder.ui.BuilderUI.base(this, 'render', element);

		var parentElement = this.getElement();

		var content = this.getDomHelper().createElement("div");
		goog.dom.classlist.add(content, "Builder-UIContent");

		this.renderCodeRegion(content);

		this.getDomHelper().appendChild(parentElement, content);

		this.palette.render(parentElement);
	}
};

prism.theme.builder.ui.BuilderUI.prototype.renderCodeRegion = function(parent) {
	/*
	 * LEFT
	 */
	var leftDiv = goog.dom.createElement("div");
	goog.dom.classlist.set(leftDiv, "Builder-BuilderCodeRegion");
	goog.dom.appendChild(parent, leftDiv);

	/*
	 * CODE REGION
	 */
	var preRegion = goog.dom.createElement("pre");
	this.codeRegion = goog.dom.createElement("code");

	goog.dom.appendChild(preRegion, this.codeRegion);
	goog.dom.appendChild(leftDiv, preRegion);

}

/**
 * 
 */
prism.theme.builder.ui.BuilderUI.prototype.fillCode = function(lang) {
	/*
	 * REMOVE CLASS FROM PARENT
	 */
	goog.dom.classlist.set(goog.dom.getParentElement(this.codeRegion), "");
	/*
	 * APPLY CLASS
	 */
	if (lang == null || lang.isGlobal()) {
		goog.dom.classlist.set(this.codeRegion, "language-javascript");
	} else {
		goog.dom.classlist.set(this.codeRegion, "language-" + lang.getName());
	}
	/*
	 * REPLACE CODE
	 */
	prism.theme.builder.LanguageCodeFactory.getCode(lang, function(code) {
		goog.dom.setTextContent(this.codeRegion, code);
		/*
		 * RERUN PRISM
		 */
		Prism.highlightAll(false, null);
	}, this)
};