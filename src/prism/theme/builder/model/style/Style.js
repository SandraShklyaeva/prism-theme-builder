goog.provide("prism.theme.builder.model.style.Style");

/**
 * 
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {*}
 *            value
 * @implements {prism.theme.builder.model.style.IStyle}
 */
prism.theme.builder.model.style.Style = function(value) {
	this.value = value;
};

/**
 * 
 */
prism.theme.builder.model.style.Style.prototype.update = function(style) {
	this.setValue(style.getValue());
};

/**
 * @return {(String|null)} the name
 */
prism.theme.builder.model.style.Style.prototype.getName = function() {
	return this.name;
};

/**
 * @param {(String|null)}
 *            name the name to set
 */
prism.theme.builder.model.style.Style.prototype.setName = function(name) {
	this.name = name;
};

/**
 * @param {*}
 *            value the value to set
 */
prism.theme.builder.model.style.Style.prototype.setValue = function(value) {
	this.value = value;
};

/**
 * @return {*} the value
 */
prism.theme.builder.model.style.Style.prototype.getValue = function() {
	return this.value;
};

/**
 * @return {String}
 */
prism.theme.builder.model.style.Style.prototype.toCSS = function() {
	return this.name + ": " + this.value;
};
