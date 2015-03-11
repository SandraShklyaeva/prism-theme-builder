goog.provide("prism.theme.builder.model.style.MarginPaddingStyle");

goog.require("prism.theme.builder.model.style.Style");

/**
 * 
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {Number|null}
 *            top
 * @param {Number|null}
 *            right
 * @param {Number|null}
 *            bottom
 * @param {Number|null}
 *            left
 * @extends {prism.theme.builder.model.style.Style}
 */
prism.theme.builder.model.style.MarginPaddingStyle = function(top, right,
		bottom, left) {
	prism.theme.builder.model.style.Style.call(this, null);
	this.top = top;
	this.right = right;
	this.bottom = bottom;
	this.left = left;
};
goog.inherits(prism.theme.builder.model.style.MarginPaddingStyle,
		prism.theme.builder.model.style.Style);
/**
 * @param {prism.theme.builder.model.style.MarginPaddingStyle}
 *            style
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.update = function(
		style) {
	if (style.getTop()) {
		this.top = style.getTop();
	}
	if (style.getRight()) {
		this.right = style.getRight();
	}
	if (style.getBottom()) {
		this.bottom = style.getBottom();
	}
	if (style.getLeft()) {
		this.left = style.getLeft();
	}
};

/**
 * @return {Number|null} the top
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.getTop = function() {
	return this.top;
};

/**
 * @return {Number|null} the right
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.getRight = function() {
	return this.right;
};

/**
 * @return {Number|null} the bottom
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.getBottom = function() {
	return this.bottom;
};

/**
 * @return {Number|null} the left
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.getLeft = function() {
	return this.left;
};

/**
 * @override
 * @see prism.theme.builder.model.style.IStyle#toCSS()
 * @return {String}
 */
prism.theme.builder.model.style.MarginPaddingStyle.prototype.toCSS = function() {
	return this.name + ": " + (this.top != null ? this.top + "px" : "0px")
			+ " " + (this.right != null ? this.right + "px" : "0px") + " "
			+ (this.bottom != null ? this.bottom + "px" : "0px") + " "
			+ (this.left != null ? this.left + "px" : "0px");
}
