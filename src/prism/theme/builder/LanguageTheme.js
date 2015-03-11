goog.provide("prism.theme.builder.LanguageTheme");

goog.require("goog.fs");
goog.require("goog.net.XhrIo");
goog.require("prism.theme.builder.CodeBlockTokenStyle");
goog.require("prism.theme.builder.CodeInlineTokenStyle");
goog.require("prism.theme.builder.CodeLinesTokenStyle");
goog.require("prism.theme.builder.CodeRegionTokenStyle");
goog.require("prism.theme.builder.LanguageThemeFactory");
goog.require("prism.theme.builder.TokenStyle");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.LanguageTheme = function() {
	this.name = null;
	this.tokens = {};
	this.codeRegionToken = null;
	this.codeBlockToken = null;
	this.codeInlineToken = null;
	this.codeLinesToken = null;
};

/**
 * @param {String|null}
 *            name the name to set
 */
prism.theme.builder.LanguageTheme.prototype.setName = function(name) {
	this.name = name;
};

/**
 * @return {String|null} the name
 */
prism.theme.builder.LanguageTheme.prototype.getName = function() {
	return this.name;
};

/**
 * 
 */
prism.theme.builder.LanguageTheme.prototype.isCustom = function() {
	return this.name == null;
};

/**
 * 
 */
prism.theme.builder.LanguageTheme.prototype.toCustom = function() {
	this.name = null;
};

/**
 * @return {prism.theme.builder.CodeRegionTokenStyle} the codeRegionToken
 */
prism.theme.builder.LanguageTheme.prototype.getCodeRegionToken = function() {
	if (this.codeRegionToken == null) {
		this.codeRegionToken = new prism.theme.builder.CodeRegionTokenStyle();
	}
	return this.codeRegionToken;
};

/**
 * @return {prism.theme.builder.CodeBlockTokenStyle} the codeBlockToken
 */
prism.theme.builder.LanguageTheme.prototype.getCodeBlockToken = function() {
	if (this.codeBlockToken == null) {
		this.codeBlockToken = new prism.theme.builder.CodeBlockTokenStyle();
	}
	return this.codeBlockToken;
};

/**
 * @return {prism.theme.builder.CodeInlineTokenStyle} the codeInlineToken
 */
prism.theme.builder.LanguageTheme.prototype.getCodeInlineToken = function() {
	if (this.codeInlineToken == null) {
		this.codeInlineToken = new prism.theme.builder.CodeInlineTokenStyle();
	}
	return this.codeInlineToken;
};

/**
 * @return {prism.theme.builder.CodeLinesTokenStyle} the codeLinesToken
 */
prism.theme.builder.LanguageTheme.prototype.getCodeLinesToken = function() {
	if (this.codeLinesToken == null) {
		this.codeLinesToken = new prism.theme.builder.CodeLinesTokenStyle();
	}
	return this.codeLinesToken;
};

/**
 * 
 * @param {prism.theme.builder.model.Token}
 *            token
 * @return {prism.theme.builder.TokenStyle}
 */
prism.theme.builder.LanguageTheme.prototype.getToken = function(token,
		language, forceCreate) {
	var styleToken = this.tokens[language != null ? language.getName() + " > "
			+ token.getQualifiedName() : token.getQualifiedName()];
	if (styleToken == null && forceCreate) {
		styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(),
				language != null ? language.getName() : null);
		this.addToken(styleToken);
	}
	return styleToken;
};

prism.theme.builder.LanguageTheme.prototype.addToken = function(token) {
	if (typeof this.tokens[token.getQualfiedNameWithLanguage()] === 'undefined') {
		this.tokens[token.getQualfiedNameWithLanguage()] = token;
	}
}

prism.theme.builder.LanguageTheme.prototype.toCSS = function(lang,
		parentCSSSelector) {
	var style = "";

	if (this.codeRegionToken != null) {
		style += (parentCSSSelector != null ? parentCSSSelector + " " : "")
				+ "pre[class*=\"language-\"]" + "{\n"
				+ this.codeRegionToken.toCSS() + "\n}\n";
	}

	if (this.codeBlockToken != null) {
		style += (parentCSSSelector != null ? parentCSSSelector + " " : "")
				+ "code[class*=\"language-\"]" + "{\n"
				+ this.codeBlockToken.toCSS() + "\n}\n";
	}

	if (this.codeInlineToken != null) {
		style += (parentCSSSelector != null ? parentCSSSelector + " " : "")
				+ ":not(pre) > code[class*=\"language-\"]" + "{\n"
				+ this.codeInlineToken.toCSS() + "\n}\n";
	}

	if (lang == null) {
		for ( var token in this.tokens) {
			var styleToken = this.tokens[token];
			var css = styleToken.toCSS();
			if (css !== "") {
				style += (parentCSSSelector != null ? parentCSSSelector + " "
						: "")
						+ ((styleToken.getLanguage() != null) ? ".language-"
								+ styleToken.getLanguage() + " " : "")
						+ (styleToken.isToken() ? "" : ".token")
						+ styleToken.cssName + "{\n" + css + "\n}\n";
			}
		}
	} else {
		for (var i = 0; i < lang.length; i++) {
			var token = lang[i];
			var styleToken = this.tokens[token.getQualifiedName()];
			if (styleToken != null) {
				var css = styleToken.toCSS();
				if (css !== "") {
					style += (parentCSSSelector != null ? parentCSSSelector
							+ " " : "")
							+ ((styleToken.getLanguage() != null) ? ".language-"
									+ styleToken.getLanguage() + " "
									: "")
							+ (styleToken.isToken() ? "" : ".token")
							+ styleToken.cssName + "{\n" + css + "\n}\n";
				}
			}
		}
	}
	return style;
};

/**
 * 
 */
prism.theme.builder.LanguageTheme.prototype.download = function() {
	if (this.isCustom()) {
		var blob = goog.fs.getBlobWithProperties([ this.toCSS() ], "text/css");
		saveAs(blob, "style.css");
	} else {
		var cssFile = prism.theme.builder.LanguageThemeFactory
				.getCSSFile(this.name);
		var url = "file:///C:/Users/daginno/workspaces/closureide2/prism-theme-builder/themes/"
				+ cssFile;
		goog.net.XhrIo.send(url, function(e) {
			var xhr = e.target;
			var result = xhr.getResponseText();
			var blob = goog.fs.getBlobWithProperties([ result ], "text/css");
			saveAs(blob, cssFile);
		});
	}
};
