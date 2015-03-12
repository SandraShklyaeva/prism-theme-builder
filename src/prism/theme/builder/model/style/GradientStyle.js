goog.provide("prism.theme.builder.model.style.GradientStyle");

goog.require("prism.theme.builder.model.style.Style");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {*}
 *            value
 * @extends {prism.theme.builder.model.style.Style}
 */
prism.theme.builder.model.style.GradientStyle = function(color1, stop1, color2,
		stop2) {
	prism.theme.builder.model.style.Style.call(this, null);
	this.color1 = color1;
	this.stop1 = stop1;
	this.color2 = color2;
	this.stop2 = stop2;
}
goog.inherits(prism.theme.builder.model.style.GradientStyle,
		prism.theme.builder.model.style.Style);

/**
 * @override
 * @see prism.theme.builder.model.style.IStyle#toCSS()
 * @return {String}
 */
prism.theme.builder.model.style.GradientStyle.prototype.toCSS = function() {
	var value = "(" + this.color1 + " " + this.stop1 + ", " + this.color2 + " " + this.stop2 + ")";
	return "background-image: -webkit-linear-gradient" + value + ";\n" +
	 "background-image: -moz-linear-gradient" + value + ";\n"+ 
	 "background-image: -ms-linear-gradient" + value + ";\n" +
	 "background-image: -o-linear-gradient" + value + ";\n" +
	 "background-image: linear-gradient" + value + "\n";
}