goog.provide("prism.theme.builder.ui.ViewPalette");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.dom.classlist");
goog.require("goog.events.EventType");
goog.require("goog.ui.Container");
goog.require("prism.theme.builder.ui.Event");
goog.require("prism.theme.builder.ui.EventType");
goog.require("prism.theme.builder.ui.PaletteRenderer");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {goog.ui.ControlContent}
 *            opt_content
 * @param {goog.ui.ControlRenderer}
 *            opt_renderer
 * @param {goog.dom.DomHelper}
 *            opt_domHelper
 * @extends {goog.ui.Control}
 */
prism.theme.builder.ui.ViewPalette = function(opt_renderer, opt_domHelper) {
	goog.ui.Container.call(this, null, opt_renderer
			|| prism.theme.builder.ui.PaletteRenderer.getInstance(),
			opt_domHelper);
	this.headerContent = null;
	this.content = null;

	this.createHeaderContent();
	this.createContent();
}
goog.inherits(prism.theme.builder.ui.ViewPalette, goog.ui.Container);

/**
 * @private
 */
prism.theme.builder.ui.ViewPalette.prototype.createHeaderContent = function() {
	var header = goog.dom.createElement("div");
	goog.dom.classlist.add(header, "Builder-PaletteHeader");

	this.logo = goog.dom.createElement("h2");
	goog.dom.setTextContent(this.logo, "Viewing a theme...");

	goog.dom.appendChild(header, this.logo);
	this.setHeaderContent(header);
};

/**
 * @private
 */
prism.theme.builder.ui.ViewPalette.prototype.createContent = function() {
	var content = goog.dom.createElement("div");
	goog.dom.classlist.add(content, "Builder-PaletteContent");

	var buttonBack = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonBack,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-arrow-left fa-lg\"></i>&nbsp;Back to all themes</div>"));
	goog.events.listen(buttonBack, goog.events.EventType.CLICK, function(e) {
		this.dispatchEvent(new prism.theme.builder.ui.Event(null, null,
				prism.theme.builder.ui.EventType.VIEW_ALL,
				this.actualEventTarget_));
	}, false, this);

	var buttonDownload = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonDownload,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-download fa-lg\"></i>&nbsp;Download the theme</div>"));
	goog.events.listen(buttonDownload, goog.events.EventType.CLICK,
			function(e) {
				this.dispatchEvent(new prism.theme.builder.ui.Event(null, null,
						prism.theme.builder.ui.EventType.DOWNLOAD,
						this.actualEventTarget_));
			}, false, this);

	var buttonEdit = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonEdit,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-pencil fa-lg\"></i>&nbsp;Edit the theme</div>"));
	goog.events.listen(buttonEdit, goog.events.EventType.CLICK, function(e) {
		this
				.dispatchEvent(new prism.theme.builder.ui.Event(null, null,
						prism.theme.builder.ui.EventType.EDIT,
						this.actualEventTarget_));
	}, false, this);

	goog.dom.appendChild(content, buttonEdit);
	goog.dom.appendChild(content, buttonDownload);
	goog.dom.appendChild(content, buttonBack);

	this.setContent(content);
};

/**
 * @param {any}
 *            headerContent the headerContent to set
 */
prism.theme.builder.ui.ViewPalette.prototype.setHeaderContent = function(
		headerContent) {
	this.headerContent = headerContent;
};

/**
 * @return {any} the headerContent
 */
prism.theme.builder.ui.ViewPalette.prototype.getHeaderContent = function() {
	return this.headerContent;
};

/**
 * @param {any}
 *            content the content to set
 */
prism.theme.builder.ui.ViewPalette.prototype.setContent = function(content) {
	this.content = content;
};

/**
 * @return {any} the content
 */
prism.theme.builder.ui.ViewPalette.prototype.getContent = function() {
	return this.content;
};

/**
 * 
 */
prism.theme.builder.ui.ViewPalette.prototype.themeSelected = function(themeName) {
	if(themeName != null){
		goog.dom.setTextContent(this.logo, "Viewing \"" + themeName + "\" theme");
	}else{
		goog.dom.setTextContent(this.logo, "Viewing \"custom\" theme");
	}
};