goog.provide("prism.theme.builder.model.style.ShadowBoxStyle");

goog.require("prism.theme.builder.model.style.Style");


/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @implements {prism.theme.builder.model.style.IStyle}
 */
prism.theme.builder.model.style.ShadowBoxStyle = function(distanceX, distanceY,
		blur, radius, color) {
	prism.theme.builder.model.style.Style.call(this,null);
	this.distanceX = distanceX;
	this.distanceY = distanceY;
	this.blur = blur;
	this.radius = radius;
	this.color = color;
};
goog.inherits(prism.theme.builder.model.style.ShadowBoxStyle,
		prism.theme.builder.model.style.Style);

/**
 * 
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.update = function(
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
	if (style.getRadius() != null) {
		this.radius = style.getRadius();
	}
	if (style.getColor() != null) {
		this.color = style.getColor();
	}
};

/**
 * @return {any} the distanceX
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.getDistanceX = function() {
	return this.distanceX;
};

/**
 * @return {any} the distanceY
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.getDistanceY = function() {
	return this.distanceY;
};

/**
 * @return {any} the blur
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.getBlur = function() {
	return this.blur;
};

/**
 * @return {any} the radius
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.getRadius = function() {
	return this.radius;
};

/**
 * @return {any} the color
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.getColor = function() {
	return this.color;
};

/**
 * @override
 * @see prism.theme.builder.model.style.IStyle#toCSS()
 */
prism.theme.builder.model.style.ShadowBoxStyle.prototype.toCSS = function() {
	return this.name + ": " + (this.distanceX != null ? this.distanceX + "px " : "0px ")
			+ (this.distanceY != null ? this.distanceY + "px " : "0px ")
			+ (this.blur != null ? this.blur + "px " : "0px ")
			+ (this.radius != null ? this.radius + "px " : "0px ")
			+ (this.color != null ? this.color : "black");
}
