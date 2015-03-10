goog.provide("prism.theme.builder.model.Token");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {prism.theme.builder.model.Token}
 *            parent
 * @param {String}
 *            name
 */
prism.theme.builder.model.Token = function(parent, name) {
	this.parent = parent;
	this.name = name;
};

/**
 * @private
 * @type {String}
 */
prism.theme.builder.model.Token.prototype.qualifiedName = null;
/**
 * @private
 * @type {String}
 */
prism.theme.builder.model.Token.prototype.cssName = null;
/**
 * @private
 * @type {String}
 */
prism.theme.builder.model.Token.prototype.name = null;
/**
 * @private
 * @type {prism.theme.builder.model.Token}
 */
prism.theme.builder.model.Token.prototype.parent = null;

/**
 * @return {String} the name
 */
prism.theme.builder.model.Token.prototype.getName = function() {
	return this.name;
};
/**
 * @return {String}
 */
prism.theme.builder.model.Token.prototype.getCSSName = function() {
	if (this.cssName == null) {
		var result = "";
		if (this.parent != null) {
			result += this.parent.getCSSName() + " ";
		}
		result += "." + this.name;

		this.cssName = result;
	}
	return this.cssName;
}
/**
 * @return {String}
 */
prism.theme.builder.model.Token.prototype.getQualifiedName = function() {
	if (this.qualifiedName == null) {
		var result = "";
		if (this.parent != null) {
			result += this.parent.getQualifiedName() + " > ";
		}
		result += this.name;

		this.qualifiedName = result;
	}
	return this.qualifiedName;
}
/**
 * @return {String}
 */
prism.theme.builder.model.Token.prototype.toString = function() {
	return this.getQualifiedName();
};