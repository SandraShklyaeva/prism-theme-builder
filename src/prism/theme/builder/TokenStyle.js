goog.provide("prism.theme.builder.TokenStyle");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.TokenStyle = function(qualifiedName, cssName, language) {
	this.qualifiedName = qualifiedName;
	this.cssName = cssName;
	this.language = language;
	this.styles = {};
};

prism.theme.builder.TokenStyle.prototype.language = null;
prism.theme.builder.TokenStyle.prototype.styles = null;

/**
 * 
 */
prism.theme.builder.TokenStyle.prototype.isToken = function() {
	return this.qualifiedName == "token";
};

/**
 * 
 */
prism.theme.builder.TokenStyle.prototype.setStyle = function(name, style) {
	style.setName(name);
	
	if (typeof this.styles[name] !== "undefined") {
		this.styles[name].update(style);
	} else {
		this.styles[name] = style;
	}
};

prism.theme.builder.TokenStyle.prototype.getStyle = function(name) {
	return this.styles[name];
};

prism.theme.builder.TokenStyle.prototype.removeStyle = function(name) {
	delete this.styles[name];
};

/**
 * @return {String} the language
 */
prism.theme.builder.TokenStyle.prototype.getLanguage = function() {
	return this.language;
};

/**
 * 
 */
prism.theme.builder.TokenStyle.prototype.getQualfiedNameWithLanguage = function() {
	if (this.language != null) {
		return this.language + " > " + this.getQualifiedName();
	}
	return this.getQualifiedName();
};

/**
 * @return {String} the qualifiedName
 */
prism.theme.builder.TokenStyle.prototype.getQualifiedName = function() {
	return this.qualifiedName;
};

prism.theme.builder.TokenStyle.prototype.toCSS = function() {
	var style = "";
	for ( var styleName in this.styles) {
		var styleObject = this.styles[styleName];
		style += "    " + styleObject.toCSS() + ";\n";
	}
	return style;
};
