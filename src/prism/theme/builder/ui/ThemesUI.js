goog.provide("prism.theme.builder.ui.ThemesUI");

goog.require("goog.cssom");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.dom.classlist");
goog.require("goog.events.EventType");
goog.require("prism.theme.builder.LanguageTheme");
goog.require("prism.theme.builder.LanguageThemeFactory");
goog.require("prism.theme.builder.ui.AbstractUI");
goog.require("prism.theme.builder.ui.Event");
goog.require("prism.theme.builder.ui.EventType");
goog.require("prism.theme.builder.ui.PrismPalette");

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
prism.theme.builder.ui.ThemesUI = function(builder, opt_renderer, opt_domHelper) {

	prism.theme.builder.ui.AbstractUI.call(this, null, opt_renderer,
			opt_domHelper);

	this.builder = builder;
	this.palette = new prism.theme.builder.ui.PrismPalette();
}
goog.inherits(prism.theme.builder.ui.ThemesUI,
		prism.theme.builder.ui.AbstractUI);

/**
 * 
 */
prism.theme.builder.ui.ThemesUI.prototype.createContent = function() {

};

/**
 * 
 */
prism.theme.builder.ui.ThemesUI.prototype.render = function(element) {

	this.sceneStyles = [];

	this.scene = goog.dom.createElement("div");
	goog.dom.classlist.add(this.scene, "Builder-ThemesOverviewWrapper");

	var themesDiv = goog.dom.createElement("div");
	goog.dom.classlist.add(themesDiv, "Builder-ThemesOverview");
	goog.dom.classlist.add(themesDiv, "pure-g");

	var themes = prism.theme.builder.LanguageThemeFactory.themes;

	for ( var themeName in themes) {
		var theme = new prism.theme.builder.LanguageTheme();
		prism.theme.builder.LanguageThemeFactory.applyTheme(themeName,
				this.builder.getTokens(), theme);

		var themeWrapperWrapperDiv = goog.dom.createElement("div");
		goog.dom.classlist
				.set(themeWrapperWrapperDiv, "pure-u-1 pure-u-lg-1-3");

		var themeWrapperDiv = goog.dom.createElement("div");
		goog.dom.classlist.add(themeWrapperDiv, "theme-" + themeName);
		goog.dom.classlist.add(themeWrapperDiv, "Builder-ThemesOverview-Item");

		var author = prism.theme.builder.LanguageThemeFactory
				.getAuthor(themeName);
		var themeHeader = goog.dom.createElement("h2");

		if (author != null) {
			goog.dom.setTextContent(themeHeader, theme.getLabel() + " / ");
			var authorLabel = this.getDomHelper().createElement("a");
			goog.dom.setProperties(authorLabel, {
				"title" : "View author's profile on GitHub",
				"href" : "https://github.com/" + author,
				"target" : "_blank"
			});
			goog.dom.setTextContent(authorLabel, author);
			goog.dom.appendChild(themeHeader, authorLabel);
		} else {
			goog.dom.setTextContent(themeHeader, theme.getLabel());
		}

		goog.dom.appendChild(themeWrapperDiv, themeHeader);

		var themeInnerWrapperDiv = goog.dom.createElement("div");
		goog.dom.classlist.add(themeInnerWrapperDiv,
				"Builder-ThemesOverview-Inner");

		var themePre = goog.dom.createElement("pre");
		var themeCode = goog.dom.createElement("code");
		goog.dom.classlist.set(themeCode, "language-javascript");
		goog.dom.setTextContent(themeCode, this.getDummyCode());

		goog.dom.appendChild(themePre, themeCode);
		goog.dom.appendChild(themeInnerWrapperDiv, themePre);
		goog.dom.appendChild(themeWrapperDiv, themeInnerWrapperDiv);
		this.createButtons(themeWrapperDiv, themeName);

		goog.dom.appendChild(themeWrapperWrapperDiv, themeWrapperDiv);
		goog.dom.appendChild(themesDiv, themeWrapperWrapperDiv);

		this.sceneStyles.push(goog.cssom.addCssText(theme.toCSS(null,
				(".theme-" + themeName)), null));
	}

	var content = this.getDomHelper().createElement("div");
	goog.dom.classlist.add(content, "Builder-UIContent");

	this.getDomHelper().appendChild(this.scene, themesDiv);
	this.getDomHelper().appendChild(content, this.scene);
	this.setContent(content);

	prism.theme.builder.ui.ThemesUI.base(this, 'render', element);
	var parentElement = this.getElement();

	this.palette.render(parentElement);

};

prism.theme.builder.ui.ThemesUI.prototype.createButtons = function(parentNode,
		themeName) {

	var wrapper = goog.dom.createElement("div");
	goog.dom.classlist.add(wrapper, "pure-g");

	var unit = goog.dom.createElement("div");
	goog.dom.classlist.set(unit, "pure-u-1-3");
	goog.dom.appendChild(wrapper, unit);

	var button = goog.dom.createElement("div");
	goog.dom.classlist.set(button, "Builder-Button");
	goog.dom.setTextContent(button, "View");
	goog.events.listen(button, goog.events.EventType.CLICK, function(e) {
		this
				.dispatchEvent(new prism.theme.builder.ui.Event(themeName,
						null, prism.theme.builder.ui.EventType.VIEW,
						this.actualEventTarget_));
	}, false, this);

	goog.dom.appendChild(unit, button);

	unit = goog.dom.createElement("div");
	goog.dom.classlist.set(unit, "pure-u-1-3");
	goog.dom.appendChild(wrapper, unit);

	button = goog.dom.createElement("div");
	goog.dom.classlist.set(button, "Builder-Button");
	goog.dom.setTextContent(button, "Edit");
	goog.events.listen(button, goog.events.EventType.CLICK, function(e) {
		this
				.dispatchEvent(new prism.theme.builder.ui.Event(themeName,
						null, prism.theme.builder.ui.EventType.EDIT,
						this.actualEventTarget_));
	}, false, this);

	goog.dom.appendChild(unit, button);

	unit = goog.dom.createElement("div");
	goog.dom.classlist.set(unit, "pure-u-1-3");
	goog.dom.appendChild(wrapper, unit);

	button = goog.dom.createElement("div");
	goog.dom.classlist.set(button, "Builder-Button");
	goog.dom.setTextContent(button, "Download");
	goog.events.listen(button, goog.events.EventType.CLICK, function(e) {
		this.dispatchEvent(new prism.theme.builder.ui.Event(themeName, null,
				prism.theme.builder.ui.EventType.DOWNLOAD,
				this.actualEventTarget_));
	}, false, this);

	goog.dom.appendChild(unit, button);

	goog.dom.appendChild(parentNode, wrapper);
}

prism.theme.builder.ui.ThemesUI.prototype.getDummyCode = function() {
	return "function rise(name){\n"
			+ "    return \"Rise and shine, \" + name + \". Rise and... shine.\"\n"
			+ "};\n"
			+ "\n"
			+ "rise(\"Mister Freeman\");\n"
			+ "\n"
			+ "var answer = prompt(\"Do you really want to live in a world without coca-cola?\");\n"
			+ "" + "";
}