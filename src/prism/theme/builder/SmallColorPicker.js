goog.provide("prism.theme.builder.SmallColorPicker");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.style");
goog.require("goog.color.alpha");
goog.require("goog.dom.classlist");
goog.require("goog.positioning.AnchoredViewportPosition");
goog.require("goog.positioning.Corner");
goog.require("goog.ui.Button");
goog.require("goog.ui.FlatButtonRenderer");
goog.require("goog.ui.HsvaPalette");
goog.require("goog.ui.Popup");
goog.require("goog.ui.Component.EventType");
goog.require("goog.ui.Component.State");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 */
prism.theme.builder.SmallColorPicker = function() {
}

/**
 * 
 */
prism.theme.builder.SmallColorPicker.prototype.setEnabled = function(enable) {
	this.colorButton.setEnabled(enable);
};

/**
 * 
 */
prism.theme.builder.SmallColorPicker.prototype.setColor = function(color) {
	this.color = color;
	if (this.getColorButton() != null) {
		goog.style.setStyle(this.getColorButton().getElement(), { "background":color});
	}
};

prism.theme.builder.SmallColorPicker.prototype.getColor = function() {
	return this.color;
};

/**
 * 
 */
prism.theme.builder.SmallColorPicker.prototype.render = function(parent) {
	var colorButtonWrapper = goog.dom.createElement("div");
	goog.dom.classlist.add(colorButtonWrapper, "Builder-ColorPickerButton");
	goog.dom.appendChild(parent, colorButtonWrapper);
	
	this.colorButton = new goog.ui.Button(null, new goog.ui.FlatButtonRenderer());
	this.colorButton.setSupportedState(goog.ui.Component.State.FOCUSED, false);
	this.colorButton.render(colorButtonWrapper);
	
	var paletteTextDiv = goog.dom.createElement("div");
	goog.dom.classlist.add(paletteTextDiv, "Builder-ColorPickerPopup")
	goog.style.setStyle(paletteTextDiv, "visibility", "hidden");
	goog.dom.appendChild(document.body, paletteTextDiv);
	this.colorPicker = new goog.ui.HsvaPalette();
	this.colorPicker.render(paletteTextDiv);
	
	this.pickerPopup = new goog.ui.Popup(paletteTextDiv);
	this.pickerPopup.setHideOnEscape(true);
	this.pickerPopup.setAutoHide(true);
	this.pickerPopup.setPinnedCorner(goog.positioning.Corner.TOP_LEFT);
	this.pickerPopup.setPosition(new goog.positioning.AnchoredViewportPosition(this.colorButton.getElement(),
			goog.positioning.Corner.TOP_RIGHT));
	this.pickerPopup.setVisible(false);
	
	 goog.events.listen(this.colorButton, goog.ui.Component.EventType.ACTION, function(e) {
		 console.log("HELLO");
			this.pickerPopup.setVisible(true);
		}, false, this);
	 goog.events.listen(this.colorPicker, goog.ui.Component.EventType.ACTION, function(e){
		 this.setColor(goog.color.alpha.hexToRgbaStyle(this.colorPicker.getColorRgbaHex()));
	 }, false, this);
	 
};

/**
 * @return {goog.ui.Button} the colorButton
 */
prism.theme.builder.SmallColorPicker.prototype.getColorButton = function() {
	return this.colorButton;
};

/**
 * @return {goog.ui.HsvaPalette} the colorPicker
 */
prism.theme.builder.SmallColorPicker.prototype.getColorPicker = function() {
	return this.colorPicker;
};

/**
 * @return {goog.ui.Button} the button
 */
prism.theme.builder.SmallColorPicker.prototype.getButton = function() {
	return this.button;
};