goog.provide("prism.theme.builder.model.style.ShadowTextStyle");

goog.require("prism.theme.builder.model.style.Style");
goog.require("prism.theme.builder.model.style.StyleConstants");


/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @implements {prism.theme.builder.model.style.IStyle}
 */
prism.theme.builder.model.style.ShadowTextStyle = function(distanceX,
		distanceY, blur, color) {
	prism.theme.builder.model.style.Style.call(this, null);
	this.distanceX = distanceX;
	this.distanceY = distanceY;
	this.blur = blur;
	this.color = color;
};
goog.inherits(prism.theme.builder.model.style.ShadowTextStyle,
		prism.theme.builder.model.style.Style);

/**
 * 
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.update = function(
		style) {
	if (style.getDistanceX() != null) {
		this.distanceX = style.getDistanceX();
	}
	if (style.getDistanceY() != null) {
		this.distanceY = style.getDistanceY();
	}
	if (style.getBlur() != null) {
		this.blur = style.getBlur();
	}
	if (style.getColor() != null) {
		this.color = style.getColor();
	}
};

/**
 * @return {any} the blur
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.getBlur = function() {
	return this.blur;
};

/**
 * @return {any} the color
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.getColor = function() {
	return this.color;
};

/**
 * @return {any} the distanceX
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.getDistanceX = function() {
	return this.distanceX;
};

/**
 * @return {any} the distanceY
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.getDistanceY = function() {
	return this.distanceY;
};

/**
 * @override
 * @see prism.theme.builder.model.style.IStyle#toCSS()
 */
prism.theme.builder.model.style.ShadowTextStyle.prototype.toCSS = function() {
	return this.name + ": " +(this.distanceX != null ? this.distanceX + "px " : "0px ")
			+ (this.distanceY != null ? this.distanceY + "px " : "0px ")
			+ (this.blur != null ? this.blur + "px " : "0px ")
			+ (this.color != null ? this.color : "black");
}
