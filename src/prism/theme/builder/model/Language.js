goog.provide("prism.theme.builder.model.Language");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.model.Language = function(name) {
	this.name = name;
};
/**
 * @private
 */
prism.theme.builder.model.Language.prototype.qualifiedTokenNames = null;
/**
 * @param {String}
 */
prism.theme.builder.model.Language.prototype.addToken = function(tokenQualifiedName) {
	if (this.qualifiedTokenNames == null) {
		this.qualifiedTokenNames = [];
	}
	this.qualifiedTokenNames.push(tokenQualifiedName);
};
/**
 * @return {any} the name
 */
prism.theme.builder.model.Language.prototype.getName = function() {
	return this.name;
};
/**
 * @return {Array} the tokens
 */
prism.theme.builder.model.Language.prototype.getTokens = function() {
	return this.qualifiedTokenNames;
};

/**
 * 
 */
prism.theme.builder.model.Language.prototype.isGlobal = function() {
	return false;
};
