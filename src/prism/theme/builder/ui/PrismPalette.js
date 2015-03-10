goog.provide("prism.theme.builder.ui.PrismPalette");

goog.require("goog.dom");
goog.require("goog.dom.classlist");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.ui.PrismPalette = function() {

};

prism.theme.builder.ui.PrismPalette.prototype.render = function(parent) {
	if (parent == null) {
		parent = document.body;
	}

	this.palette = goog.dom.createElement("div");
	goog.dom.classlist.add(this.palette, "Builder-PaletteWrapper");
	goog.dom.setProperties(this.palette, {
		"id" : "Builder-PrismPalette"
	});

	var header = goog.dom.createElement("div");
	goog.dom.classlist.add(header, "Builder-PaletteHeader");

	var logo = goog.dom.createElement("h2");
	goog.dom.setTextContent(logo, "Prism Theme Builder");

	goog.dom.appendChild(header, logo);

	var content = goog.dom.createElement("div");
	goog.dom.classlist.add(content, "Builder-PaletteContent");
	goog.dom
			.appendChild(
					content,
					goog.dom
							.htmlToDocumentFragment("This is a small app to explore, download, create and play with themes for <a target=\"_blank\" href=\"http://prismjs.com/\">Prism.js</a> - a lightweight syntax highlighter."
									+ "<br/><br/>"
									+ "<i class=\"fa fa-eye fa-lg\"></i>&nbsp;Use the \"View\" button to explore a theme for all supported languages."
									+ "<br/><br/>"
									+ "<i class=\"fa fa-pencil fa-lg\"></i>&nbsp;Use the \"Edit\" button to customize a theme."
									+ "<br/><br/>"));

	var button = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					button,
					goog.dom
							.htmlToDocumentFragment("<a class=\"Builder-Button\" target=\"_blank\" href=\"\"><i class=\"fa fa-github fa-lg\"></i>&nbsp;Fork on GitHub</a>"));
	goog.dom.appendChild(content, button);

	goog.dom.appendChild(this.palette, header);
	goog.dom.appendChild(this.palette, content);
	goog.dom.appendChild(parent, this.palette);
};
