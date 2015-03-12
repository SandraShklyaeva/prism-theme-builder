goog.provide("prism.theme.builder.ui.BuilderPalette");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.style");
goog.require("goog.dom.classlist");
goog.require("goog.events.EventType");
goog.require("goog.ui.Checkbox");
goog.require("goog.ui.Container");
goog.require("goog.ui.Option");
goog.require("goog.ui.Select");
goog.require("goog.ui.Separator");
goog.require("goog.ui.Slider");
goog.require("goog.ui.Textarea");
goog.require("goog.ui.ToggleButton");
goog.require("goog.ui.Component.EventType");
goog.require("goog.ui.Component.State");
goog.require("prism.theme.builder.Constants");
goog.require("prism.theme.builder.SmallColorPicker");
goog.require("prism.theme.builder.model.style.BorderStyle");
goog.require("prism.theme.builder.model.style.MarginPaddingStyle");
goog.require("prism.theme.builder.model.style.PixelStyle");
goog.require("prism.theme.builder.model.style.ShadowBoxStyle");
goog.require("prism.theme.builder.model.style.ShadowTextStyle");
goog.require("prism.theme.builder.model.style.Style");
goog.require("prism.theme.builder.model.style.StyleConstants");
goog.require("prism.theme.builder.ui.Event");
goog.require("prism.theme.builder.ui.EventType");
goog.require("prism.theme.builder.ui.LanguageSelectedEvent");
goog.require("prism.theme.builder.ui.PaletteRenderer");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @param {goog.ui.ControlContent}
 *            opt_content
 * @param {goog.ui.ControlRenderer}
 *            opt_renderer
 * @param {goog.dom.DomHelper}
 *            opt_domHelper
 * @extends {goog.ui.Control}
 */
prism.theme.builder.ui.BuilderPalette = function(builder, opt_renderer,
		opt_domHelper) {
	goog.ui.Container.call(this, null, opt_renderer
			|| prism.theme.builder.ui.PaletteRenderer.getInstance(),
			opt_domHelper);
	this.headerContent = null;
	this.content = null;
	this.builder = builder;

	this.createHeaderContent();
	this.createContent();
}
goog.inherits(prism.theme.builder.ui.BuilderPalette, goog.ui.Container);

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.createHeaderContent = function() {
	var header = goog.dom.createElement("div");
	goog.dom.classlist.add(header, "Builder-PaletteHeader");

	var logo = goog.dom.createElement("h2");
	goog.dom.setTextContent(logo, "Editing a theme...");

	goog.dom.appendChild(header, logo);
	this.setHeaderContent(header);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.createContent = function() {
	var content = goog.dom.createElement("div");
	goog.dom.classlist.add(content, "Builder-PaletteContent");
	goog.dom.classlist.add(content, "Builder-BuilderPalette");

	var buttonBack = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonBack,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-arrow-left fa-lg\"></i>&nbsp;Back to all themes</div>"));
	goog.events.listen(buttonBack, goog.events.EventType.CLICK, function(e) {
		this.dispatchEvent(new prism.theme.builder.ui.Event(null, this.builder
				.getTheme(), prism.theme.builder.ui.EventType.VIEW_ALL,
				this.actualEventTarget_));
	}, false, this);

	var buttonDownload = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonDownload,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-download fa-lg\"></i>&nbsp;Download the theme</div>"));
	goog.events.listen(buttonDownload, goog.events.EventType.CLICK,
			function(e) {
				this.dispatchEvent(new prism.theme.builder.ui.Event(null,
						this.builder.getTheme(),
						prism.theme.builder.ui.EventType.DOWNLOAD,
						this.actualEventTarget_));
			}, false, this);

	var buttonView = goog.dom.createElement("div");
	goog.dom
			.appendChild(
					buttonView,
					goog.dom
							.htmlToDocumentFragment("<div class=\"Builder-Button\"><i class=\"fa fa-eye fa-lg\"></i>&nbsp;View the theme</div>"));
	goog.events.listen(buttonView, goog.events.EventType.CLICK, function(e) {
		this.dispatchEvent(new prism.theme.builder.ui.Event(null, this.builder
				.getTheme(), prism.theme.builder.ui.EventType.VIEW,
				this.actualEventTarget_));
	}, false, this);

	goog.dom.appendChild(content, buttonView);
	goog.dom.appendChild(content, buttonDownload);
	goog.dom.appendChild(content, buttonBack);
	this.renderRight(content);

	this.setContent(content);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.renderRight = function(parent) {
	/*
	 * RIGHT
	 */
	var rightDiv = goog.dom.createElement("div");
	goog.dom.appendChild(parent, rightDiv);

	/*
	 * MAIN SEPARATOR
	 */
	var separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(rightDiv, separatortDiv);
	var separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	// var zippyWrapperDiv = goog.dom.createElement("div");
	// goog.dom.classlist.set(zippyWrapperDiv, "Builder-Zippy");
	// var zippyHeader = goog.dom.createElement("h2");
	// goog.dom.setTextContent(zippyHeader, "Token Styles");
	// var zippyDiv = goog.dom.createElement("p");
	// goog.dom.appendChild(rightDiv, zippyHeader);
	// goog.dom.appendChild(zippyWrapperDiv, zippyDiv);
	// goog.dom.appendChild(rightDiv, zippyWrapperDiv);

	var zippyDiv = goog.dom.createElement("div");
	goog.dom.appendChild(rightDiv, zippyDiv);

	// this.zippyTokens = new goog.ui.Zippy(zippyHeader, zippyDiv, true);

	/*
	 * SELECT LANGUAGE
	 */
	var selectLanguageDiv = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, selectLanguageDiv);
	this.selectLanguage = new goog.ui.Select('Select language', null, null);
	this.selectLanguage.setFocusablePopupMenu(true);
	goog.events
			.listen(
					this.selectLanguage,
					goog.ui.Component.EventType.ACTION,
					function(e) {
						var item = this.selectLanguage.getSelectedItem();
						if (item != null) {
							this
									.dispatchEvent(new prism.theme.builder.ui.LanguageSelectedEvent(
											item.getModel(),
											prism.theme.builder.ui.EventType.LANG_SELECTED,
											this.actualEventTarget_));
							this.languageSelected(item.getModel());
						}
					}, false, this);
	this.fillLanguages();
	this.selectLanguage.render(selectLanguageDiv);

	/*
	 * SELECT STYLE TARGET
	 */
	var selectWhatStyleDiv = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, selectWhatStyleDiv);
	this.selectStyleTargets = new goog.ui.Select('What to style?', null, null);
	this.selectStyleTargets.setFocusablePopupMenu(true);
	goog.events.listen(this.selectStyleTargets,
			goog.ui.Component.EventType.ACTION, function(e) {
				var item = this.selectStyleTargets.getSelectedItem();
				if (item != null) {
					this.styleTargetSelected(item.getModel());
				}
			}, false, this);
	this.fillStyleTargets();
	this.selectStyleTargets.render(selectWhatStyleDiv);

	this.groupTokens = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupTokens);

	/*
	 * TABLE
	 */
	var tableDiv = this.getTable(this.groupTokens);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Select token");
	tableCell = this.getTableCell(tableRow);

	/*
	 * MAIN SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(zippyDiv);

	/*
	 * SELECT TOKEN
	 */
	var selectTokenDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, selectTokenDiv);
	this.selectToken = new goog.ui.Select('Select token', null, null);
	this.selectToken.setFocusablePopupMenu(true);
	goog.events.listen(this.selectToken, goog.ui.Component.EventType.CHANGE,
			function(e) {
				var item = this.selectToken.getSelectedItem();
				if (item != null) {
					this.tokenSelected(item.getModel());
				}
			}, false, this);
	this.selectToken.render(selectTokenDiv);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Style");
	tableCell = this.getTableCell(tableRow);

	/*
	 * BOLD
	 */
	var boldDom = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, boldDom);
	this.toggleBold = new goog.ui.ToggleButton([ goog.dom.createDom('span', {},
			'bold') ]);
	this.toggleBold.setSupportedState(goog.ui.Component.State.FOCUSED, false);
	this.toggleBold.setDispatchTransitionEvents(
			goog.ui.Component.State.CHECKED, true);
	this.toggleBold.render(boldDom);
	goog.style.setInlineBlock(boldDom);
	goog.events
			.listen(
					this.toggleBold,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.updateToken(
										prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
										new prism.theme.builder.model.style.Style(
												"bold"));
					}, false, this);
	goog.events
			.listen(
					this.toggleBold,
					goog.ui.Component.EventType.UNCHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT);
					}, false, this);

	/*
	 * ITALIC
	 */
	var itallicDom = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, itallicDom);
	this.toggleItallic = new goog.ui.ToggleButton([ goog.dom.createDom('span',
			{}, 'italic') ]);
	this.toggleItallic
			.setSupportedState(goog.ui.Component.State.FOCUSED, false);
	this.toggleItallic.setDispatchTransitionEvents(
			goog.ui.Component.State.CHECKED, true);
	this.toggleItallic.render(itallicDom);
	goog.style.setInlineBlock(itallicDom);
	goog.events
			.listen(
					this.toggleItallic,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.updateToken(
										prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
										new prism.theme.builder.model.style.Style(
												"italic"));
					}, false, this);
	goog.events
			.listen(
					this.toggleItallic,
					goog.ui.Component.EventType.UNCHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.FONT_STYLE);
					}, false, this);

	/*
	 * UPPERCASE
	 */
	var uppercaseDom = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, uppercaseDom);
	this.toggleUppercase = new goog.ui.ToggleButton([ goog.dom.createDom(
			'span', {}, 'uppercase') ]);
	this.toggleUppercase.setSupportedState(goog.ui.Component.State.FOCUSED,
			false);
	this.toggleUppercase.setDispatchTransitionEvents(
			goog.ui.Component.State.CHECKED, true);
	this.toggleUppercase.render(uppercaseDom);
	goog.style.setInlineBlock(uppercaseDom);
	goog.events
			.listen(
					this.toggleUppercase,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.updateToken(
										prism.theme.builder.model.style.StyleConstants.TEXT_TRANSFORM,
										new prism.theme.builder.model.style.Style(
												"uppercase"));
					}, false, this);
	goog.events
			.listen(
					this.toggleUppercase,
					goog.ui.Component.EventType.UNCHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.TEXT_TRANSFORM);
					}, false, this);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Decoration");
	tableCell = this.getTableCell(tableRow);

	/*
	 * STYLE - underscore, line over, line through
	 */
	var styleDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, styleDiv);
	this.selectStyle = new goog.ui.Select('Select Decoration', null, null);
	this.selectStyle.setFocusablePopupMenu(true);
	goog.events
			.listen(
					this.selectStyle,
					goog.ui.Component.EventType.CHANGE,
					function(e) {
						var item = this.selectStyle.getSelectedItem();
						if (item != null) {
							this.builder
									.updateToken(
											prism.theme.builder.model.style.StyleConstants.TEXT_DECORATION,
											new prism.theme.builder.model.style.Style(
													item.getModel()));
						}
					}, false, this);

	this.selectStyle.addItem(new goog.ui.Option("none", "none", null, false));
	this.selectStyle.addItem(new goog.ui.Option("overline", "overline", null,
			false));
	this.selectStyle.addItem(new goog.ui.Option("line through", "line-through",
			null, false));
	this.selectStyle.addItem(new goog.ui.Option("underline", "underline", null,
			false));
	this.selectStyle.render(styleDiv);
	this.selectStyle.setSelectedIndex(0);

	/*
	 * TEXT COLOR PALETTE
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Color");
	tableCell = this.getTableCell(tableRow);
	this.pickerColor = this.getSmallColorPicker(tableCell, true);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Background Color");
	tableCell = this.getTableCell(tableRow);

	this.pickerBackground = this.getSmallColorPicker(tableCell, true);

	this.groupTextSizeSpacing = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupTextSizeSpacing);

	/*
	 * GENERAL SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(this.groupTextSizeSpacing, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(this.groupTextSizeSpacing);

	/*
	 * SIZE
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Font Size");
	tableCell = this.getTableCell(tableRow);
	var sliderText = this.getSliderTextField(tableCell, 7, 50, 1,
			this.updateSize, false, true);
	this.sliderSize = sliderText.slider;
	this.textareaSize = sliderText.text;
	this.checkboxSize = sliderText.checkbox;

	/*
	 * LINE HEIGHT
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Line Height");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 1, 10, 0.5,
			this.updateLineHeight, false, true);
	this.textareaLineHeight = sliderText.text;
	this.sliderLineHeight = sliderText.slider;
	this.checkboxLineHeight = sliderText.checkbox;

	/*
	 * LETTER SPACING
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Letter Spacing");
	tableCell = this.getTableCell(tableRow);
	sliderText = this.getSliderTextField(tableCell, -10, 30, 1,
			this.updateLetterSpacing, false, true);
	this.textareaLetterSpacing = sliderText.text;
	this.sliderLetterSpacing = sliderText.slider;
	this.checkboxLetterSpacing = sliderText.checkbox;

	/*
	 * WORD SPACING
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Word Spacing");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 0, 30, 1,
			this.updateWordSpacing, false, true);
	this.textareaWordSpacing = sliderText.text;
	this.sliderWordSpacing = sliderText.slider;
	this.checkboxWordSpacing = sliderText.checkbox;

	this.groupTextShadow = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupTextShadow);

	/*
	 * TEXT SHADOW SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(this.groupTextShadow, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(this.groupTextShadow);

	/*
	 * TEXT SHADOW
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Shadow X");
	tableCell = this.getTableCell(tableRow);

	sliderText = this
			.getSliderTextField(tableCell, 0, 30, 1, this.updateShadow);
	this.textareaShadowDistanceX = sliderText.text;
	this.sliderShadowDistanceX = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Shadow Y");
	tableCell = this.getTableCell(tableRow);

	sliderText = this
			.getSliderTextField(tableCell, 0, 30, 1, this.updateShadow);
	this.textareaShadowDistanceY = sliderText.text;
	this.sliderShadowDistanceY = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Shadow Blur");
	tableCell = this.getTableCell(tableRow);

	sliderText = this
			.getSliderTextField(tableCell, 0, 30, 1, this.updateShadow);
	this.textareaShadowBlur = sliderText.text;
	this.sliderShadowBlur = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Text Shadow Color");
	tableCell = this.getTableCell(tableRow);

	this.pickerShadowColor = this.getSmallColorPicker(tableCell, null);

	this.checkboxInheritTextShadow = this.getInheritCheckBox(tableCell, true);

	this.groupBoxShadow = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupBoxShadow);

	/*
	 * BOX SHADOW SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(this.groupBoxShadow, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(this.groupBoxShadow);

	/*
	 * BOX SHADOW
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Box Shadow X");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 0, 30, 1,
			this.updateBoxShadow);
	this.textareaBoxShadowDistanceX = sliderText.text;
	this.sliderBoxShadowDistanceX = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Box Shadow Y");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 0, 30, 1,
			this.updateBoxShadow);
	this.textareaBoxShadowDistanceY = sliderText.text;
	this.sliderBoxShadowDistanceY = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Box Shadow Blur");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 0, 30, 1,
			this.updateBoxShadow);
	this.textareaBoxShadowBlur = sliderText.text;
	this.sliderBoxShadowBlur = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Box Shadow Spread");
	tableCell = this.getTableCell(tableRow);

	sliderText = this.getSliderTextField(tableCell, 0, 30, 1,
			this.updateBoxShadow, true);
	this.textareaBoxShadowRadius = sliderText.text;
	this.sliderBoxShadowRadius = sliderText.slider;

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Box Shadow Color");
	tableCell = this.getTableCell(tableRow);

	this.pickerBoxShadowColor = this.getSmallColorPicker(tableCell, null);

	this.checkboxInheritBoxShadow = this.getInheritCheckBox(tableCell, true);

	this.groupBorder = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupBorder);

	/*
	 * BORDER SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(this.groupBorder, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(this.groupBorder);

	/*
	 * BORDER
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Border Width");
	tableCell = this.getTableCell(tableRow);

	sliderText = this
			.getSliderTextField(tableCell, 0, 30, 1, this.updateBorder);
	this.textareaBorderWidth = sliderText.text;
	this.sliderBorderWidth = sliderText.slider;

	/*
	 * BORDER STYLE
	 */
	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Border Style");
	tableCell = this.getTableCell(tableRow);

	var boprderStyleDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, boprderStyleDiv);
	this.selectBorderStyle = new goog.ui.Select('Select Border Style', null,
			null);
	this.selectBorderStyle.setFocusablePopupMenu(true);

	this.selectBorderStyle.addItem(new goog.ui.Option("solid", "solid", null,
			false));
	this.selectBorderStyle.addItem(new goog.ui.Option("dotted", "dotted", null,
			false));
	this.selectBorderStyle.addItem(new goog.ui.Option("dashed", "dashed", null,
			false));
	this.selectBorderStyle.addItem(new goog.ui.Option("double", "double", null,
			false));
	this.selectBorderStyle.addItem(new goog.ui.Option("groove", "groove", null,
			false));
	this.selectBorderStyle.addItem(new goog.ui.Option("ridge", "ridge", null,
			false));
	this.selectBorderStyle.render(boprderStyleDiv);
	this.selectBorderStyle.setSelectedIndex(0);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Border Color");
	tableCell = this.getTableCell(tableRow);

	this.pickerBorderColor = this.getSmallColorPicker(tableCell, null);

	this.checkboxInheritBorder = this.getInheritCheckBox(tableCell, true);

	this.groupMarginPadding = goog.dom.createElement("div");
	goog.dom.appendChild(zippyDiv, this.groupMarginPadding);

	/*
	 * MARGIN/PADDING SEPARATOR
	 */
	separatortDiv = goog.dom.createElement("div");
	goog.dom.appendChild(this.groupMarginPadding, separatortDiv);
	separator = new goog.ui.Separator();
	separator.render(separatortDiv);

	tableDiv = this.getTable(this.groupMarginPadding);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Margin");
	tableCell = this.getTableCell(tableRow);

	this.textareaMargin = this.getFourTextField(tableCell, this.updateMargin,
			this.updateMargin, this.updateMargin, this.updateMargin, true);

	tableRow = this.getTableRow(tableDiv);
	this.getTableLabelCell(tableRow, "Padding");
	tableCell = this.getTableCell(tableRow);

	this.textareaPadding = this.getFourTextField(tableCell, this.updatePadding,
			this.updatePadding, this.updatePadding, this.updatePadding, true);

	this.attachEvents();
}

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.attachEvents = function() {
	/*
	 * COLOR
	 */
	goog.events.listen(this.pickerColor.picker.getColorPicker(),
			goog.ui.Component.EventType.ACTION, this.updateColor, false, this);
	goog.events
			.listen(
					this.pickerColor.checkbox,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.COLOR);
					}, false, this);
	goog.events.listen(this.pickerColor.checkbox,
			goog.ui.Component.EventType.UNCHECK, this.updateColor, false, this);

	/*
	 * BACKGROUND COLOR
	 */
	goog.events.listen(this.pickerBackground.picker.getColorPicker(),
			goog.ui.Component.EventType.ACTION, this.updateBackgroundColor,
			false, this);
	goog.events
			.listen(
					this.pickerBackground.checkbox,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR);
					}, false, this);
	goog.events.listen(this.pickerBackground.checkbox,
			goog.ui.Component.EventType.UNCHECK, this.updateBackgroundColor,
			false, this);
	/*
	 * SIZE
	 */
	goog.events
			.listen(
					this.checkboxSize,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.FONT_SIZE);
					}, false, this);
	goog.events.listen(this.checkboxSize, goog.ui.Component.EventType.UNCHECK,
			this.updateSize, false, this);
	/*
	 * LINE HEIGHT
	 */
	goog.events
			.listen(
					this.checkboxLineHeight,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.LINE_HEIGHT);
					}, false, this);
	goog.events.listen(this.checkboxLineHeight,
			goog.ui.Component.EventType.UNCHECK, this.updateLineHeight, false,
			this);
	/*
	 * LETTER SPACING
	 */
	goog.events
			.listen(
					this.checkboxLetterSpacing,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.LETTER_SPACING);
					}, false, this);
	goog.events.listen(this.checkboxLetterSpacing,
			goog.ui.Component.EventType.UNCHECK, this.updateLetterSpacing,
			false, this);
	/*
	 * WORD SPACING
	 */
	goog.events
			.listen(
					this.checkboxWordSpacing,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.WORD_SPACING);
					}, false, this);
	goog.events.listen(this.checkboxWordSpacing,
			goog.ui.Component.EventType.UNCHECK, this.updateWordSpacing, false,
			this);
	/*
	 * TEXT SHADOW
	 */
	goog.events.listen(this.pickerShadowColor.picker.getColorPicker(),
			goog.ui.Component.EventType.ACTION, this.updateShadow, false, this);
	goog.events
			.listen(
					this.checkboxInheritTextShadow,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						// disable slider and textarea
						this.disableShadowBlur(true);
						this.disableShadowColor(true);
						this.disableShadowDistanceX(true);
						this.disableShadowDistanceY(true);
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.TEXT_SHADOW);
					}, false, this);
	goog.events.listen(this.checkboxInheritTextShadow,
			goog.ui.Component.EventType.UNCHECK, function(e) {
				// enable slider and textarea
				this.disableShadowBlur(false);
				this.disableShadowColor(false);
				this.disableShadowDistanceX(false);
				this.disableShadowDistanceY(false);
				this.updateShadow(e);
			}, false, this);
	/*
	 * BOX SHADOW
	 */
	goog.events.listen(this.pickerBoxShadowColor.picker.getColorPicker(),
			goog.ui.Component.EventType.ACTION, this.updateBoxShadow, false,
			this);
	goog.events
			.listen(
					this.checkboxInheritBoxShadow,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						// disable slider and textarea
						this.disableBoxShadowBlur(true);
						this.disableBoxShadowColor(true);
						this.disableBoxShadowDistanceX(true);
						this.disableBoxShadowDistanceY(true);
						this.disableBoxShadowRadius(true);
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.BOX_SHADOW);
					}, false, this);
	goog.events.listen(this.checkboxInheritBoxShadow,
			goog.ui.Component.EventType.UNCHECK, function(e) {
				// enable slider and textarea
				this.disableBoxShadowBlur(false);
				this.disableBoxShadowColor(false);
				this.disableBoxShadowDistanceX(false);
				this.disableBoxShadowDistanceY(false);
				this.disableBoxShadowRadius(false);
				this.updateBoxShadow();
			}, false, this);
	/*
	 * BORDER
	 */
	goog.events.listen(this.selectBorderStyle,
			goog.ui.Component.EventType.CHANGE, this.updateBorder, false, this);
	goog.events
			.listen(
					this.checkboxInheritBorder,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.disableBorderColor(true);
						this.disableBorderStyle(true);
						this.disableBorderWidth(true);
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.BORDER);
					}, false, this);
	goog.events.listen(this.checkboxInheritBorder,
			goog.ui.Component.EventType.UNCHECK, function(e) {
				this.disableBorderColor(false);
				this.disableBorderStyle(false);
				this.disableBorderWidth(false);
				this.updateBorder(e);
			}, false, this);
	goog.events.listen(this.pickerBorderColor.picker.getColorPicker(),
			goog.ui.Component.EventType.ACTION, this.updateBorder, false, this);
	/*
	 * MARGIN
	 */
	goog.events
			.listen(
					this.textareaMargin.checkbox,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.MARGIN);
					}, false, this);
	goog.events
			.listen(this.textareaMargin.checkbox,
					goog.ui.Component.EventType.UNCHECK, this.updateMargin,
					false, this);
	/*
	 * PADDING
	 */
	goog.events
			.listen(
					this.textareaPadding.checkbox,
					goog.ui.Component.EventType.CHECK,
					function(e) {
						this.builder
								.removeToken(prism.theme.builder.model.style.StyleConstants.PADDING);
					}, false, this);
	goog.events.listen(this.textareaPadding.checkbox,
			goog.ui.Component.EventType.UNCHECK, this.updatePadding, false,
			this);
};

/**
 * 
 * @static
 * @param {prism.theme.builder.model.Language}
 *            lang
 */
prism.theme.builder.ui.BuilderPalette.prototype.languageSelected = function(
		lang) {
	this.selectToken.setEnabled(true);

	if (this.builder.getCurrentLanguage() != null) {
		this.fillTokens(this.builder.getCurrentLanguage());
	}
	if (this.currentTarget == null) {
		// set default
		this.selectStyleTargets.setSelectedIndex(0);
		this.styleTargetSelected(0);
	}
	if (this.selectToken.getItemCount() > 0) {
		this.selectToken.setSelectedIndex(0);
		this.tokenSelected(this.selectToken.getSelectedItem().getModel());
	} else {
		this.tokenSelected(null);
	}
}

/**
 * 
 * @param {prism.theme.builder.Token}
 *            token
 */
prism.theme.builder.ui.BuilderPalette.prototype.tokenSelected = function(token) {
	if (token == null) {
		// block ui -> no token is selected
		this.builder.tokenSelected(null);
		this.selectToken.setSelectedItem(null);
		// this.disable(true);
	} else {
		var lang = this.builder.getCurrentLanguage();
		this.builder.tokenSelected(this.builder.getTheme().getToken(token,
				lang.isGlobal() ? null : lang, true));

		this.initFromToken(this.builder.getCurrentToken());
		// this.disable(false);
	}
}

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.init = function() {
	var item = this.selectLanguage
			.getItemAt(this.selectLanguage.getItemCount() - 1);
	this.selectLanguage.setSelectedItem(item);
	this.dispatchEvent(new prism.theme.builder.ui.LanguageSelectedEvent(item
			.getModel(), prism.theme.builder.ui.EventType.LANG_SELECTED,
			this.actualEventTarget_));
	this.languageSelected(item.getModel());
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.initFromToken = function(token) {
	/*
	 * TEXT STYLE
	 */
	this.toggleUppercase
			.setChecked(token
					.getStyle(prism.theme.builder.model.style.StyleConstants.TEXT_TRANSFORM) == prism.theme.builder.Constants.CSS_UPPERCASE);
	this.toggleBold
			.setChecked(token
					.getStyle(prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT) == prism.theme.builder.Constants.CSS_BOLD);
	this.toggleItallic
			.setChecked(token
					.getStyle(prism.theme.builder.model.style.StyleConstants.FONT_STYLE) == prism.theme.builder.Constants.CSS_ITALIC);
	/*
	 * TEXT SIZE
	 */
	var fontSize = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.FONT_SIZE);
	if (fontSize != null) {
		goog.dom.setTextContent(this.textareaSize.getElement(), fontSize
				.getValue());
		this.checkboxSize.setChecked(false);
		this.checkboxSize.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		// set inherit
		this.checkboxSize.setChecked(true);
		this.checkboxSize.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}
	/*
	 * LINE HEIGHT
	 */
	var lineHeight = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.LINE_HEIGHT);
	if (lineHeight != null) {
		if (!isNaN(lineHeight.getValue())) {
			goog.dom.setTextContent(this.textareaLineHeight.getElement(),
					lineHeight.getValue());
		}
		this.checkboxLineHeight.setChecked(false);
		this.checkboxLineHeight
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		// set inherit
		this.checkboxLineHeight.setChecked(true);
		this.checkboxLineHeight
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}
	/*
	 * LETTER SPACING
	 */
	var letterSpacing = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.LETTER_SPACING);
	if (letterSpacing != null) {
		if (!isNaN(letterSpacing.getValue())) {
			goog.dom.setTextContent(this.textareaLetterSpacing.getElement(),
					letterSpacing.getValue());
		}
		this.checkboxLetterSpacing.setChecked(false);
		this.checkboxLetterSpacing
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.checkboxLetterSpacing.setChecked(true);
		this.checkboxLetterSpacing
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}
	/*
	 * WORD SPACING
	 */
	var wordSpacing = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.WORD_SPACING);
	if (wordSpacing != null) {
		if (!isNaN(wordSpacing.getValue())) {
			goog.dom.setTextContent(this.textareaWordSpacing.getElement(),
					wordSpacing.getValue());
		}
		this.checkboxWordSpacing.setChecked(false);
		this.checkboxWordSpacing
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		// set inherit
		this.checkboxWordSpacing.setChecked(true);
		this.checkboxWordSpacing
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

	/*
	 * COLOR
	 */
	var color = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.COLOR);
	if (color != null) {
		this.pickerColor.picker.setColor(color.getValue());
		this.pickerColor.checkbox.setChecked(false);
		this.pickerColor.checkbox
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.pickerColor.picker.setColor(null);
		this.pickerColor.checkbox.setChecked(true);
		this.pickerColor.checkbox
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}
	/*
	 * BACKGROUND
	 */
	var background = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR);
	if (background != null) {
		this.pickerBackground.picker.setColor(background.getValue());
		this.pickerBackground.checkbox.setChecked(false);
		this.pickerBackground.checkbox
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.pickerBackground.picker.setColor(null);
		this.pickerBackground.checkbox.setChecked(true);
		this.pickerBackground.checkbox
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}
	/*
	 * MARGIN
	 */
	var marginStyle = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.MARGIN);
	if (marginStyle != null) {
		if (marginStyle.getTop() != null) {
			goog.dom.setTextContent(this.textareaMargin.text1.getElement(),
					marginStyle.getTop());
		} else {
			goog.dom.setTextContent(this.textareaMargin.text1.getElement(), 0);
		}
		if (marginStyle.getLeft() != null) {
			goog.dom.setTextContent(this.textareaMargin.text2.getElement(),
					marginStyle.getLeft());
		} else {
			goog.dom.setTextContent(this.textareaMargin.text2.getElement(), 0);
		}
		if (marginStyle.getBottom() != null) {
			goog.dom.setTextContent(this.textareaMargin.text3.getElement(),
					marginStyle.getBottom());
		} else {
			goog.dom.setTextContent(this.textareaMargin.text3.getElement(), 0);
		}
		if (marginStyle.getRight() != null) {
			goog.dom.setTextContent(this.textareaMargin.text4.getElement(),
					marginStyle.getRight());
		} else {
			goog.dom.setTextContent(this.textareaMargin.text4.getElement(), 0);
		}
		this.textareaMargin.checkbox.setChecked(false);
		this.textareaMargin.checkbox
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.textareaMargin.checkbox.setChecked(true);
		this.textareaMargin.checkbox
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

	/*
	 * PADDING
	 */
	var paddingStyle = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.PADDING);
	if (paddingStyle != null) {
		if (paddingStyle.getTop() != null) {
			goog.dom.setTextContent(this.textareaPadding.text1.getElement(),
					paddingStyle.getTop());
		} else {
			goog.dom.setTextContent(this.textareaPadding.text1.getElement(), 0);
		}
		if (paddingStyle.getLeft() != null) {
			goog.dom.setTextContent(this.textareaPadding.text2.getElement(),
					paddingStyle.getLeft());
		} else {
			goog.dom.setTextContent(this.textareaPadding.text2.getElement(), 0);
		}
		if (paddingStyle.getBottom() != null) {
			goog.dom.setTextContent(this.textareaPadding.text3.getElement(),
					paddingStyle.getBottom());
		} else {
			goog.dom.setTextContent(this.textareaPadding.text3.getElement(), 0);
		}
		if (paddingStyle.getRight() != null) {
			goog.dom.setTextContent(this.textareaPadding.text4.getElement(),
					paddingStyle.getRight());
		} else {
			goog.dom.setTextContent(this.textareaPadding.text4.getElement(), 0);
		}
		this.textareaPadding.checkbox.setChecked(false);
		this.textareaPadding.checkbox
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.textareaPadding.checkbox.setChecked(true);
		this.textareaPadding.checkbox
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

	/*
	 * BORDER
	 */
	var border = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.BORDER);
	if (border != null) {
		if (border.getColor() != null) {
			this.pickerBorderColor.picker.setColor(border.getColor());
		} else {
			this.pickerBorderColor.picker.setColor(null);
		}
		if (border.getWidth() != null) {
			goog.dom.setTextContent(this.textareaBorderWidth.getElement(),
					border.getWidth());
		} else {
			goog.dom.setTextContent(this.textareaBorderWidth.getElement(), 0);
		}
		if (border.getBorderStyle() != null) {
		} else {
			this.selectBorderStyle.setSelectedIndex(0);
		}
		this.checkboxInheritBorder.setChecked(false);
		this.checkboxInheritBorder
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.checkboxInheritBorder.setChecked(true);
		this.checkboxInheritBorder
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

	/*
	 * BOX SHADOW
	 */
	var boxShadow = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.BOX_SHADOW);
	if (boxShadow != null) {
		if (boxShadow.getDistanceX() != null) {
			goog.dom.setTextContent(this.textareaBoxShadowDistanceX
					.getElement(), boxShadow.getDistanceX());
		} else {
			goog.dom.setTextContent(this.textareaBoxShadowDistanceX
					.getElement(), 0);
		}
		if (boxShadow.getDistanceY() != null) {
			goog.dom.setTextContent(this.textareaBoxShadowDistanceY
					.getElement(), boxShadow.getDistanceY());
		} else {
			goog.dom.setTextContent(this.textareaBoxShadowDistanceY
					.getElement(), 0);
		}
		if (boxShadow.getBlur() != null) {
			goog.dom.setTextContent(this.textareaBoxShadowBlur.getElement(),
					boxShadow.getBlur());
		} else {
			goog.dom.setTextContent(this.textareaBoxShadowBlur.getElement(), 0);
		}
		if (boxShadow.getRadius() != null) {
			goog.dom.setTextContent(this.textareaBoxShadowRadius.getElement(),
					boxShadow.getRadius());
		} else {
			goog.dom.setTextContent(this.textareaBoxShadowRadius.getElement(),
					0);
		}
		if (boxShadow.getColor() != null) {
			this.pickerBoxShadowColor.picker.setColor(boxShadow.getColor());
		} else {
			this.pickerBoxShadowColor.picker.setColor(null);
		}
		this.checkboxInheritBoxShadow.setChecked(false);
		this.checkboxInheritBoxShadow
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.checkboxInheritBoxShadow.setChecked(true);
		this.checkboxInheritBoxShadow
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

	/*
	 * TEXT SHADOW
	 */
	var textShadow = token
			.getStyle(prism.theme.builder.model.style.StyleConstants.TEXT_SHADOW);
	if (textShadow != null) {
		if (textShadow.getDistanceX() != null) {
			goog.dom.setTextContent(this.textareaShadowDistanceX.getElement(),
					textShadow.getDistanceX());
		} else {
			goog.dom.setTextContent(this.textareaShadowDistanceX.getElement(),
					0);
		}
		if (textShadow.getDistanceY() != null) {
			goog.dom.setTextContent(this.textareaShadowDistanceY.getElement(),
					textShadow.getDistanceY());
		} else {
			goog.dom.setTextContent(this.textareaShadowDistanceY.getElement(),
					0);
		}
		if (textShadow.getBlur() != null) {
			goog.dom.setTextContent(this.textareaShadowBlur.getElement(),
					textShadow.getBlur());
		} else {
			goog.dom.setTextContent(this.textareaShadowBlur.getElement(), 0);
		}
		if (textShadow.getColor() != null) {
			this.pickerShadowColor.picker.setColor(textShadow.getColor());
		} else {
			this.pickerShadowColor.picker.setColor(null);
		}
		this.checkboxInheritTextShadow.setChecked(false);
		this.checkboxInheritTextShadow
				.dispatchEvent(goog.ui.Component.EventType.UNCHECK);
	} else {
		this.checkboxInheritTextShadow.setChecked(true);
		this.checkboxInheritTextShadow
				.dispatchEvent(goog.ui.Component.EventType.CHECK);
	}

};

prism.theme.builder.ui.BuilderPalette.prototype.styleTargetSelected = function(
		target) {
	this.currentTarget = target;
	switch (target) {
	case 0:
		// tokens
		this.styleTokens();
		this.languageSelected(this.currentLanguage);
		break;
	case 4:
		// code region
		this.builder
				.tokenSelected(this.builder.getTheme().getCodeRegionToken());
		this.initFromToken(this.builder.getCurrentToken());
		this.styleCodeRegion();
		break;
	case 1:
		// code blocks
		this.builder.tokenSelected(this.builder.getTheme().getCodeBlockToken());
		this.initFromToken(this.builder.getCurrentToken());
		this.styleCodeBlock();
		break;
	case 2:
		// inline code
		this.builder
				.tokenSelected(this.builder.getTheme().getCodeInlineToken());
		this.initFromToken(this.builder.getCurrentToken());
		this.styleCodeInline();
		break;
	case 3:
		// lines
		this.builder.tokenSelected(this.builder.getTheme().getCodeLinesToken());
		this.initFromToken(this.builder.getCurrentToken());
		this.styleCodeLines();
		break;
	default:
		break;
	}

	// this.updateDisableState();
}

prism.theme.builder.ui.BuilderPalette.prototype.styleAll = function() {
	goog.style.setElementShown(this.groupMarginPadding, true);
	goog.style.setElementShown(this.groupBorder, true);
	goog.style.setElementShown(this.groupBoxShadow, true);
	goog.style.setElementShown(this.groupTextShadow, true);
	goog.style.setElementShown(this.groupTokens, true);
	goog.style.setElementShown(this.groupTextSizeSpacing, true);
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.styleTokens = function() {
	this.styleAll();
	goog.style.setElementShown(this.groupMarginPadding, false);
	goog.style.setElementShown(this.groupBorder, false);
	goog.style.setElementShown(this.groupBoxShadow, false);
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.styleCodeBlock = function() {
	this.styleAll();
	goog.style.setElementShown(this.groupTokens, false);
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.styleCodeRegion = function() {
	this.styleAll();
	goog.style.setElementShown(this.groupTokens, false);
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.styleCodeInline = function() {

};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.styleCodeLines = function() {

};

prism.theme.builder.ui.BuilderPalette.prototype.fillStyleTargets = function() {
	this.selectStyleTargets.addItem(new goog.ui.Option("Tokens", 0, false));
	this.selectStyleTargets.addItem(new goog.ui.Option("Code Region - <pre>",
			4, false));
	this.selectStyleTargets.addItem(new goog.ui.Option("Block Code - <code>",
			1, false));
//	this.selectStyleTargets
//			.addItem(new goog.ui.Option("Inline Code", 2, false));
	// this.selectStyleTargets.addItem(new goog.ui.Option("Code Lines", 3,
	// false));
};

prism.theme.builder.ui.BuilderPalette.prototype.fillLanguages = function() {
	var langs = this.builder.getLanguages().getLanguages();
	for ( var lang in langs) {
		this.selectLanguage
				.addItem(new goog.ui.Option(lang, langs[lang], false));
	}
};

/**
 * 
 * @param {prism.theme.builder.model.Language}
 *            lang
 */
prism.theme.builder.ui.BuilderPalette.prototype.fillTokens = function(lang) {
	var returns = this.selectToken.getMenu().removeChildren(true);
	var tokens = lang.getTokens();
	if (tokens != null) {
		for (var i = 0; i < tokens.length; i++) {
			var token = this.builder.getTokens().getToken(tokens[i]);
			this.selectToken.addItem(new goog.ui.Option(token.toString(),
					token, false));
		}
	}
}

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateColor = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style(this.pickerColor.picker
					.getColor()));
};
/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateBackgroundColor = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style(
					this.pickerBackground.picker.getColor()));
};

/**
 * 
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateBorder = function() {
	var item = this.selectBorderStyle.getSelectedItem();
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.BORDER,
			new prism.theme.builder.model.style.BorderStyle(
					this.textareaBorderWidth.getValue(), item != null ? item
							.getModel() : null, this.pickerBorderColor.picker
							.getColor()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateLetterSpacing = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.LETTER_SPACING,
			new prism.theme.builder.model.style.PixelStyle(
					this.textareaLetterSpacing.getValue()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateBoxShadow = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.BOX_SHADOW,
			new prism.theme.builder.model.style.ShadowBoxStyle(
					this.textareaBoxShadowDistanceX.getValue(),
					this.textareaBoxShadowDistanceY.getValue(),
					this.textareaBoxShadowBlur.getValue(),
					this.textareaBoxShadowRadius.getValue(),
					this.pickerBoxShadowColor.picker.getColor()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateShadow = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.TEXT_SHADOW,
			new prism.theme.builder.model.style.ShadowTextStyle(
					this.textareaShadowDistanceX.getValue(),
					this.textareaShadowDistanceY.getValue(),
					this.textareaShadowBlur.getValue(),
					this.pickerShadowColor.picker.getColor()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateWordSpacing = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.WORD_SPACING,
			new prism.theme.builder.model.style.PixelStyle(
					this.textareaWordSpacing.getValue()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateSize = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.FONT_SIZE,
			new prism.theme.builder.model.style.PixelStyle(this.textareaSize
					.getValue()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateLineHeight = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.LINE_HEIGHT,
			new prism.theme.builder.model.style.Style(this.textareaLineHeight
					.getValue()));
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateMargin = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.MARGIN,
			new prism.theme.builder.model.style.MarginPaddingStyle(
					this.textareaMargin.text1.getValue(),
					this.textareaMargin.text2.getValue(),
					this.textareaMargin.text3.getValue(),
					this.textareaMargin.text4.getValue()));
};
/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updatePadding = function() {
	this.builder.updateToken(
			prism.theme.builder.model.style.StyleConstants.PADDING,
			new prism.theme.builder.model.style.MarginPaddingStyle(
					this.textareaPadding.text1.getValue(),
					this.textareaPadding.text2.getValue(),
					this.textareaPadding.text3.getValue(),
					this.textareaPadding.text4.getValue()));
};
/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.updateDisableState = function() {
	if (this.builder.getCurrentLanguage() == null) {
		this.selectToken.setEnabled(false);
	}
	if (this.builder.getCurrentToken() == null) {
		this.disable(true);
	} else {
		this.disable(false);
	}
};

/**
 * @param {boolean}
 *            disable
 */
prism.theme.builder.ui.BuilderPalette.prototype.disable = function(disable) {
	this.disableBackground(disable);
	this.disableColor(disable);
	this.disableDecoration(disable);
	this.disableFontSize(disable);
	this.disableLetterSpacing(disable);
	this.disableLineHeight(disable);
	this.disableShadowBlur(disable);
	this.disableShadowColor(disable);
	this.disableShadowDistanceX(disable);
	this.disableShadowDistanceY(disable);

	this.disableBoxShadowBlur(disable);
	this.disableBoxShadowColor(disable);
	this.disableBoxShadowDistanceX(disable);
	this.disableBoxShadowDistanceY(disable);
	this.disableBoxShadowRadius(disable);

	this.disableTextStyle(disable);
	this.disableWordSpacing(disable);

	this.disableBorderColor(disable);
	this.disableBorderStyle(disable);
	this.disableBorderWidth(disable);

	this.disableMargin(disable);
	this.disablePadding(disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableMargin = function(
		disable) {
	this.textareaMargin.text1.setEnabled(!disable);
	this.textareaMargin.text2.setEnabled(!disable);
	this.textareaMargin.text3.setEnabled(!disable);
	this.textareaMargin.text4.setEnabled(!disable);
};
/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disablePadding = function(
		disable) {
	this.textareaPadding.text1.setEnabled(!disable);
	this.textareaPadding.text2.setEnabled(!disable);
	this.textareaPadding.text3.setEnabled(!disable);
	this.textareaPadding.text4.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBorderColor = function(
		disable) {
	this.pickerBorderColor.picker.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBorderWidth = function(
		disable) {
	this.textareaBorderWidth.setEnabled(!disable);
	this.sliderBorderWidth.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBorderStyle = function(
		disable) {
	this.selectBorderStyle.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableTextStyle = function(
		disable) {
	this.toggleBold.setEnabled(!disable);
	this.toggleItallic.setEnabled(!disable);
	this.toggleUppercase.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableFontSize = function(
		disable) {
	this.textareaSize.setEnabled(!disable);
	this.sliderSize.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableLineHeight = function(
		disable) {
	this.textareaLineHeight.setEnabled(!disable);
	this.sliderLineHeight.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableLetterSpacing = function(
		disable) {
	this.textareaLetterSpacing.setEnabled(!disable);
	this.sliderLetterSpacing.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableWordSpacing = function(
		disable) {
	this.textareaWordSpacing.setEnabled(!disable);
	this.sliderWordSpacing.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableShadowDistanceX = function(
		disable) {
	this.textareaShadowDistanceX.setEnabled(!disable);
	this.sliderShadowDistanceX.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableShadowDistanceY = function(
		disable) {
	this.textareaShadowDistanceY.setEnabled(!disable);
	this.sliderShadowDistanceY.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableShadowBlur = function(
		disable) {
	this.textareaShadowBlur.setEnabled(!disable);
	this.sliderShadowBlur.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableShadowColor = function(
		disable) {
	this.pickerShadowColor.picker.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBoxShadowDistanceX = function(
		disable) {
	this.textareaBoxShadowDistanceX.setEnabled(!disable);
	this.sliderBoxShadowDistanceX.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBoxShadowDistanceY = function(
		disable) {
	this.textareaBoxShadowDistanceY.setEnabled(!disable);
	this.sliderBoxShadowDistanceY.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBoxShadowBlur = function(
		disable) {
	this.textareaBoxShadowBlur.setEnabled(!disable);
	this.sliderBoxShadowBlur.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBoxShadowRadius = function(
		disable) {
	this.textareaBoxShadowRadius.setEnabled(!disable);
	this.sliderBoxShadowRadius.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBoxShadowColor = function(
		disable) {
	this.pickerBoxShadowColor.picker.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableBackground = function(
		disable) {
	this.pickerBackground.picker.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableColor = function(disable) {
	this.pickerColor.picker.setEnabled(!disable);
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.disableDecoration = function(
		disable) {
	this.selectStyle.setEnabled(!disable);
};

/**
 * @param {(Element|null)}
 *            headerContent the headerContent to set
 */
prism.theme.builder.ui.BuilderPalette.prototype.setHeaderContent = function(
		headerContent) {
	this.headerContent = headerContent;
};

/**
 * @return {(Element|null)} the headerContent
 */
prism.theme.builder.ui.BuilderPalette.prototype.getHeaderContent = function() {
	return this.headerContent;
};

/**
 * @return {(Element|null)} the content
 */
prism.theme.builder.ui.BuilderPalette.prototype.getContent = function() {
	return this.content;
};

/**
 * @param {(Element|null)}
 *            content the content to set
 */
prism.theme.builder.ui.BuilderPalette.prototype.setContent = function(content) {
	this.content = content;
};

/**
 * @param {!Element}
 *            parent
 * @private
 * @return {!Element}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getTable = function(parent) {
	var table = goog.dom.createElement("div");
	goog.dom.classlist.set(table, "Builder-Table");
	goog.dom.appendChild(parent, table);
	return table;
};

/**
 * @param {!Element}
 *            table
 * @private
 * @return {!Element}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getTableRow = function(table) {
	var row = goog.dom.createElement("div");
	goog.dom.classlist.set(row, "Builder-TableRow");
	goog.dom.appendChild(table, row);
	return row;
};
/**
 * @param {!Element}
 *            row
 * @private
 * @return {!Element}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getTableCell = function(row) {
	var cell = goog.dom.createElement("div");
	goog.dom.classlist.set(cell, "Builder-TableCell");
	goog.dom.appendChild(row, cell);
	return cell;
};
/**
 * @param {!Element}
 *            row
 * @param {!String}
 *            label
 * @private
 * @return {!Element}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getTableLabelCell = function(
		row, label) {
	var cell = goog.dom.createElement("div");
	goog.dom.classlist.set(cell, "Builder-TableCell");
	goog.dom.appendChild(cell, goog.dom.createTextNode(label));
	goog.dom.appendChild(row, cell);
	return cell;
};
/**
 * @param {!Element}
 *            parent
 * @param {Boolean|null}
 *            includeInherit
 * @private
 * @return {!Object}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getSmallColorPicker = function(
		parent, includeInherit) {

	var tableWrapper = goog.dom.createElement("div");
	goog.dom.classlist.add(tableWrapper, "Builder-ColorpickerTable");
	var tableRow = goog.dom.createElement("div");
	goog.dom.classlist.add(tableRow, "Builder-ColorpickerTableRow");
	var tableCell = goog.dom.createElement("div");
	goog.dom.classlist.add(tableCell, "Builder-ColorpickerTableCell");
	goog.dom.appendChild(tableRow, tableCell);

	var colorpickerDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, colorpickerDiv);
	var picker = new prism.theme.builder.SmallColorPicker();
	picker.render(colorpickerDiv);

	var checkbox = null;
	if (includeInherit != null) {
		tableCell = goog.dom.createElement("div");
		goog.dom.classlist.add(tableCell, "Builder-ColorpickerTableCell");
		goog.dom.appendChild(tableRow, tableCell);

		checkbox = this.getInheritCheckBox(tableCell, includeInherit);
		goog.events.listen(checkbox, goog.ui.Component.EventType.CHECK,
				function(e) {
					// disable slider and textarea
					picker.setEnabled(false);
				}, false, this);
		goog.events.listen(checkbox, goog.ui.Component.EventType.UNCHECK,
				function(e) {
					// enable slider and textarea
					picker.setEnabled(true);
				}, false, this);
	}

	goog.dom.appendChild(tableWrapper, tableRow);
	goog.dom.appendChild(parent, tableWrapper);

	return {
		picker : picker,
		checkbox : checkbox
	};
};
/**
 * @private
 * @param {!Element}
 *            parent
 * @param {!Number}
 *            sliderMin
 * @param {!Number}
 *            sliderMax
 * @param {!Number}
 *            sliderStep
 * @param {Function|null}
 *            listener
 * @return {goog.ui.Slider}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getSlider = function(parent,
		sliderMin, sliderMax, sliderStep, listener) {

	var sliderDiv = goog.dom.createElement("div");
	goog.dom.appendChild(parent, sliderDiv);
	var slider = new goog.ui.Slider();
	slider.handleKeyDown_ = function() {
	};
	slider.setMinimum(sliderMin);
	slider.setMaximum(sliderMax);
	slider.setStep(sliderStep);
	slider.render(sliderDiv);

	goog.events.listen(slider, goog.ui.Component.EventType.CHANGE, listener,
			false, this);

	return slider;
};
/**
 * @private
 * @param {!Element}
 *            parent
 * @param {!Number}
 *            sliderMin
 * @param {!Number}
 *            sliderMax
 * @param {!Number}
 *            sliderStep
 * @param {Function|null}
 *            textListener
 * @param {Boolean}
 *            strict
 * @param {Boolean}
 *            includeInherit
 * @return {Object}
 */
prism.theme.builder.ui.BuilderPalette.prototype.getSliderTextField = function(
		parent, sliderMin, sliderMax, sliderStep, textListener, strict,
		includeInherit) {
	var tableWrapper = goog.dom.createElement("div");
	goog.dom.classlist.add(tableWrapper, "Builder-SliderTextareaTable");
	var tableRow = goog.dom.createElement("div");
	goog.dom.classlist.add(tableRow, "Builder-SliderTextareaTableRow");
	var tableCell = goog.dom.createElement("div");
	goog.dom.classlist.add(tableCell, "Builder-SliderTextareaTableCell");
	goog.dom.appendChild(tableRow, tableCell);

	var sliderDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, sliderDiv);
	var slider = new goog.ui.Slider();
	slider.handleKeyDown_ = function() {
	};
	slider.setMinimum(sliderMin);
	slider.setMaximum(sliderMax);
	slider.setStep(sliderStep);
	slider.render(sliderDiv);

	tableCell = goog.dom.createElement("div");
	goog.dom.classlist.add(tableCell, "Builder-SliderTextareaTableCell");
	goog.dom.appendChild(tableRow, tableCell);

	var textDiv = goog.dom.createElement("div");
	goog.dom.appendChild(tableCell, textDiv);
	var textarea = new goog.ui.Textarea();
	textarea.setValue(0);
	textarea.render(textDiv);

	goog.events.listen(textarea.getElement(), goog.events.EventType.INPUT,
			function(e) {
				var value = textarea.getValue();
				if (value != "-") {
					if (isNaN(value)) {
						slider.moveThumbs(slider.getMinimum());
						textarea.setValue(slider.getMinimum());
					} else if (value !== "") {
						if (strict) {
							value = +value;
							if (value < slider.getMinimum()) {
								value = slider.getMinimum();
							} else if (value > slider.getMaximum()) {
								value = slider.getMaximum();
							}
						}
						slider.moveThumbs(+value - slider.getValue());
						textarea.setValue(value);
						if (textListener != null) {
							textListener.call(this, e);
						}
					}
				}
			}, false, this);

	goog.events.listen(slider, goog.ui.Component.EventType.CHANGE, function(e) {
		textarea.setValue(slider.getValue());
		if (textListener != null) {
			textListener.call(this, e);
		}
	}, false, this);

	goog.dom.appendChild(tableWrapper, tableRow);
	goog.dom.appendChild(parent, tableWrapper);

	var checkbox = null;
	if (includeInherit != null) {
		tableCell = goog.dom.createElement("div");
		goog.dom.classlist.add(tableCell, "Builder-SliderTextareaTableCell");
		goog.dom.appendChild(tableRow, tableCell);

		checkbox = this.getInheritCheckBox(tableCell, includeInherit);
		goog.events.listen(checkbox, goog.ui.Component.EventType.CHECK,
				function(e) {
					// disable slider and textarea
					textarea.setEnabled(false);
					slider.setEnabled(false);
				}, false, this);
		goog.events.listen(checkbox, goog.ui.Component.EventType.UNCHECK,
				function(e) {
					// enable slider and textarea
					textarea.setEnabled(true);
					slider.setEnabled(true);
				}, false, this);
	}

	return {
		slider : slider,
		text : textarea,
		checkbox : checkbox
	};
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.getInheritCheckBox = function(
		parent, isInherit) {
	var checkboxDiv = goog.dom.createElement("div");
	goog.dom.classlist.add(checkboxDiv, "goog-checkbox-wrapper");
	var checkbox = new goog.ui.Checkbox();
	checkbox.render(checkboxDiv);
	if (isInherit == true) {
		checkbox.setModel("inherit");
		goog.dom.appendChild(checkboxDiv, goog.dom.createTextNode("inherit"));
	} else {
		checkbox.setModel("none");
		goog.dom.appendChild(checkboxDiv, goog.dom.createTextNode("none"));
	}
	goog.dom.appendChild(parent, checkboxDiv);

	return checkbox;
};

/**
 * @private
 */
prism.theme.builder.ui.BuilderPalette.prototype.getFourTextField = function(
		parent, textListener1, textListener2, textListener3, textListener4,
		includeInherit) {

	var textDiv = goog.dom.createElement("div");
	goog.style.setInlineBlock(textDiv);
	goog.dom.appendChild(parent, textDiv);

	var textarea1 = new goog.ui.Textarea();
	textarea1.setAllowTextSelection(true);
	textarea1.setValue(0);
	textarea1.render(textDiv);

	textDiv = goog.dom.createElement("div");
	goog.style.setInlineBlock(textDiv);
	goog.dom.appendChild(parent, textDiv);

	var textarea2 = new goog.ui.Textarea();
	textarea2.setAllowTextSelection(true);
	textarea2.setValue(0);
	textarea2.render(textDiv);

	textDiv = goog.dom.createElement("div");
	goog.style.setInlineBlock(textDiv);
	goog.dom.appendChild(parent, textDiv);

	var textarea3 = new goog.ui.Textarea();
	textarea3.setAllowTextSelection(true);
	textarea3.setValue(0);
	textarea3.render(textDiv);

	textDiv = goog.dom.createElement("div");
	goog.style.setInlineBlock(textDiv);
	goog.dom.appendChild(parent, textDiv);

	var textarea4 = new goog.ui.Textarea();
	textarea4.setAllowTextSelection(true);
	textarea4.setValue(0);
	textarea4.render(textDiv);

	var checkbox = null;
	if (includeInherit != null) {
		textDiv = goog.dom.createElement("div");
		goog.style.setInlineBlock(textDiv);
		goog.dom.appendChild(parent, textDiv);

		checkbox = this.getInheritCheckBox(textDiv, includeInherit);
		goog.events.listen(checkbox, goog.ui.Component.EventType.CHECK,
				function(e) {
					textarea1.setEnabled(false);
					textarea2.setEnabled(false);
					textarea3.setEnabled(false);
					textarea4.setEnabled(false);
				}, false, this);
		goog.events.listen(checkbox, goog.ui.Component.EventType.UNCHECK,
				function(e) {
					textarea1.setEnabled(true);
					textarea2.setEnabled(true);
					textarea3.setEnabled(true);
					textarea4.setEnabled(true);
				}, false, this);
	}

	goog.events.listen(textarea1.getElement(), goog.events.EventType.INPUT,
			textListener1, false, this);
	goog.events.listen(textarea2.getElement(), goog.events.EventType.INPUT,
			textListener2, false, this);
	goog.events.listen(textarea3.getElement(), goog.events.EventType.INPUT,
			textListener3, false, this);
	goog.events.listen(textarea4.getElement(), goog.events.EventType.INPUT,
			textListener4, false, this);

	return {
		text1 : textarea1,
		text2 : textarea2,
		text3 : textarea3,
		text4 : textarea4,
		checkbox : checkbox
	};
};