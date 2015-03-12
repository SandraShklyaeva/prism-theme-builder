goog.provide("prism.theme.builder.ui.ViewUI");

goog.require("goog.cssom");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.dom.classlist");
goog.require("prism.theme.builder.LanguageCodeFactory");
goog.require("prism.theme.builder.LanguageTheme");
goog.require("prism.theme.builder.LanguageThemeFactory");
goog.require("prism.theme.builder.model.TokenPool");
goog.require("prism.theme.builder.ui.AbstractUI");
goog.require("prism.theme.builder.ui.ViewPalette");

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
prism.theme.builder.ui.ViewUI = function(builder, opt_renderer, opt_domHelper) {
	prism.theme.builder.ui.AbstractUI.call(this, null, opt_renderer,
			opt_domHelper);
	this.palette = new prism.theme.builder.ui.ViewPalette();
	this.builder = builder;
}
goog.inherits(prism.theme.builder.ui.ViewUI, prism.theme.builder.ui.AbstractUI);

/**
 * 
 */
prism.theme.builder.ui.ViewUI.prototype.update = function() {
	goog.dom.removeNode(this.cssStyle);

	if (this.builder.getViewTheme() != null) {
		this.cssStyle = goog.cssom.addCssText(this.builder.getViewTheme()
				.toCSS(null, ".theme-overview"), null);
		this.palette.themeSelected(this.builder.getViewTheme());
	}
};

/**
 * 
 */
prism.theme.builder.ui.ViewUI.prototype.render = function(element) {

	this.scene = goog.dom.createElement("div");
	goog.dom.classlist.add(this.scene, "Builder-ThemeOverviewWrapper");

	var themesDiv = goog.dom.createElement("div");
	goog.dom.classlist.add(themesDiv, "Builder-ThemeOverview");
	goog.dom.classlist.add(themesDiv, "pure-g");

	var langs = this.builder.getLanguages().getLanguages();

	this.pendingLanguages = Object.keys(langs).length - 1;

	for ( var langName in langs) {
		var lang = langs[langName];
		if (!lang.isGlobal()) {

			var themeWrapperWrapperDiv = goog.dom.createElement("div");
			goog.dom.classlist.set(themeWrapperWrapperDiv,
					"pure-u-1 pure-u-lg-1-2");

			var themeWrapperDiv = goog.dom.createElement("div");
			goog.dom.classlist.add(themeWrapperDiv, "theme-overview");
			goog.dom.classlist.add(themeWrapperDiv,
					"Builder-ThemeOverview-Item");

			var themeInnerWrapperDiv = goog.dom.createElement("div");
			goog.dom.classlist.add(themeInnerWrapperDiv,
					"Builder-ThemeOverview-Inner");

			var author = prism.theme.builder.LanguageCodeFactory
					.getAuthor(langName);
			var themeHeader = goog.dom.createElement("h2");

			if (author != null) {
				goog.dom.setTextContent(themeHeader, lang.getLabel() + " / ");
				var authorLabel = this.getDomHelper().createElement("a");
				goog.dom.setProperties(authorLabel, {
					"title" : "View author's profile on GitHub",
					"href" : "https://github.com/" + author,
					"target" : "_blank"
				});
				goog.dom.setTextContent(authorLabel, author);
				goog.dom.appendChild(themeHeader, authorLabel);
			} else {
				goog.dom.setTextContent(themeHeader, lang.getLabel());
			}

			goog.dom.appendChild(themeWrapperDiv, themeHeader);

			var themePre = goog.dom.createElement("pre");
			var themeCode = goog.dom.createElement("code");
			goog.dom.classlist.set(themeCode, "language-" + lang.getName());
			//

			prism.theme.builder.LanguageCodeFactory.getCode(lang,
					function(node) {
						return function(code) {
							goog.dom.setTextContent(node, code);
							this.pendingLanguages--;
							if (this.pendingLanguages == 0) {
								/*
								 * RERUN PRISM
								 */
								Prism.highlightAll(false, null);
							}
						};
					}(themeCode), this);

			goog.dom.appendChild(themePre, themeCode);

			goog.dom.appendChild(themeInnerWrapperDiv, themePre);
			goog.dom.appendChild(themeWrapperDiv, themeInnerWrapperDiv);

			goog.dom.appendChild(themeWrapperWrapperDiv, themeWrapperDiv);
			goog.dom.appendChild(themesDiv, themeWrapperWrapperDiv);

		}
	}

	if (this.builder.getViewTheme() != null) {
		this.cssStyle = goog.cssom.addCssText(this.builder.getViewTheme()
				.toCSS(null, ".theme-overview"), null);
	}

	var content = this.getDomHelper().createElement("div");
	goog.dom.classlist.add(content, "Builder-UIContent");

	this.getDomHelper().appendChild(this.scene, themesDiv);
	this.getDomHelper().appendChild(content, this.scene);
	this.setContent(content);

	prism.theme.builder.ui.ViewUI.base(this, 'render', element);

	var parentElement = this.getElement();
	this.palette.render(parentElement);

};