goog.provide("prism.theme.builder.Builder");
goog.provide("prism.theme.builder.Builder.State");

goog.require("goog.cssom");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("prism.theme.builder.Constants");
goog.require("prism.theme.builder.LanguageTheme");
goog.require("prism.theme.builder.LanguageThemeFactory");
goog.require("prism.theme.builder.TokenStyle");
goog.require("prism.theme.builder.model.GlobalLanguage");
goog.require("prism.theme.builder.model.Language");
goog.require("prism.theme.builder.model.LanguagePool");
goog.require("prism.theme.builder.model.Token");
goog.require("prism.theme.builder.model.TokenPool");
goog.require("prism.theme.builder.ui.BuilderUI");
goog.require("prism.theme.builder.ui.EventType");
goog.require("prism.theme.builder.ui.ThemesUI");
goog.require("prism.theme.builder.ui.ViewUI");
goog.require("prism.theme.builder.ui.AbstractUI.EventType");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.Builder = function() {

};

/**
 * Constants for event names.
 * 
 * @enum {string}
 */
prism.theme.builder.Builder.State = {
	THEMES : 'Themes',
	VIEW : 'View',
	EDITOR : 'Editor'
};
/**
 * @private
 */
prism.theme.builder.Builder.prototype.changingState = false;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.state = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.tokens = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.languages = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.theme = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.viewTheme = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.currentToken = null;
/**
 * @private
 */
prism.theme.builder.Builder.prototype.currentLanguage = null;
/**
 * 
 */
prism.theme.builder.Builder.prototype.run = function() {
	if (typeof Prism !== 'undefined') {
		/*
		 * INIT LANGUAGES
		 */
		this.processLanguages();

		/*
		 * INIT THEMES UI
		 */
		this.themesUI = new prism.theme.builder.ui.ThemesUI(this);
		this.themesUI.render(document.body);
		/*
		 * INIT THEME VIEW UI
		 */
		this.overviewUI = new prism.theme.builder.ui.ViewUI(this);
		this.overviewUI.render(document.body);
		/*
		 * INIT UI
		 */
		this.builderUI = new prism.theme.builder.ui.BuilderUI(this);
		this.builderUI.render(document.body);
		/*
		 * TO THEMES STATE
		 */
		this.builderUI.hide(false);
		this.overviewUI.hide(false);
		this.toState(prism.theme.builder.Builder.State.THEMES);
		/*
		 * RUN PRISM
		 */
		Prism.highlightAll(false, null);
		/*
		 * UPDATE BUILDER
		 */
		this.update();

		/*
		 * ATTACH EVENTS
		 */
		this.attachEvents();
	} else {
		console.error("We have a situation: Prism is not loaded!");
	}
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.attachEvents = function() {
	goog.events.listen(this.themesUI, prism.theme.builder.ui.EventType.EDIT,
			this.toEditState, false, this);
	goog.events.listen(this.overviewUI.getPalette(),
			prism.theme.builder.ui.EventType.EDIT, this.toEditState, false,
			this);

	goog.events.listen(this.themesUI,
			prism.theme.builder.ui.EventType.VIEW_ALL, this.toViewAllState,
			false, this);
	goog.events.listen(this.overviewUI.getPalette(),
			prism.theme.builder.ui.EventType.VIEW_ALL, this.toViewAllState,
			false, this);
	goog.events.listen(this.builderUI.getPalette(),
			prism.theme.builder.ui.EventType.VIEW_ALL, this.toViewAllState,
			false, this);

	goog.events.listen(this.themesUI, prism.theme.builder.ui.EventType.VIEW,
			this.toViewState, false, this);

	goog.events.listen(this.builderUI.getPalette(),
			prism.theme.builder.ui.EventType.VIEW, function(e) {
				if (e.getThemeName() == null && e.getTheme() == null) {
					e.setTheme(this.theme);
				}
				this.toViewState(e);
			}, false, this);

	goog.events.listen(this.builderUI.getPalette(),
			prism.theme.builder.ui.EventType.LANG_SELECTED, function(e) {
				this.languageSelected(e.getLanguage())
			}, false, this);

	goog.events.listen(this.overviewUI.getPalette(),
			prism.theme.builder.ui.EventType.DOWNLOAD, function(e) {
				this.downloadSelected(this.viewTheme);
			}, false, this);
	goog.events.listen(this.builderUI.getPalette(),
			prism.theme.builder.ui.EventType.DOWNLOAD, function(e) {
				this.downloadSelected(this.theme);
			}, false, this);
	goog.events.listen(this.themesUI,
			prism.theme.builder.ui.EventType.DOWNLOAD, function(e) {
				if (e.getThemeName() != null) {
					var theme = new prism.theme.builder.LanguageTheme();
					prism.theme.builder.LanguageThemeFactory.applyTheme(e
							.getThemeName(),
							prism.theme.builder.model.TokenPool.getInstance(),
							theme);
					this.downloadSelected(theme);
				}
			}, false, this);
};

prism.theme.builder.Builder.prototype.toViewAllState = function(e) {
	this.toState(prism.theme.builder.Builder.State.THEMES);
}

prism.theme.builder.Builder.prototype.toEditState = function(e) {
	var theme = null;
	if (e.getTheme() != null) {
		theme = e.getTheme();
	} else if (e.getThemeName() != null) {
		theme = new prism.theme.builder.LanguageTheme();
		prism.theme.builder.LanguageThemeFactory.applyTheme(e.getThemeName(),
				prism.theme.builder.model.TokenPool.getInstance(), theme);
	} else {
		theme = this.viewTheme;
	}

	if (theme != null && this.theme !== theme) {
		this.theme = theme;
		this.update();
	}

	this.theme.toCustom();

	this.toState(prism.theme.builder.Builder.State.EDITOR);
}

prism.theme.builder.Builder.prototype.toViewState = function(e) {
	var theme = null;
	if (e.getTheme() != null) {
		theme = e.getTheme();
	} else if (e.getThemeName() != null) {
		theme = new prism.theme.builder.LanguageTheme();
		prism.theme.builder.LanguageThemeFactory.applyTheme(e.getThemeName(),
				prism.theme.builder.model.TokenPool.getInstance(), theme);
	}

	if (theme != null && this.viewTheme !== theme) {
		this.viewTheme = theme;
	} else {
		this.viewTheme = this.theme;
	}
	this.toState(prism.theme.builder.Builder.State.VIEW);
}

/**
 * 
 */
prism.theme.builder.Builder.prototype.toState = function(state) {
	if (!this.changingState) {
		this.changingState = true;
		var currentUI = this.getUIByState(this.state);
		var nextUI = this.getUIByState(state);
		this.state = state;
		if (currentUI != null) {
			goog.events
					.listenOnce(
							currentUI,
							prism.theme.builder.ui.AbstractUI.EventType.HIDDEN,
							function(e) {
								// current ui is hidden
								// show next ui
								goog.events
										.listenOnce(
												nextUI,
												prism.theme.builder.ui.AbstractUI.EventType.SHOWN,
												function(e) {
													this.changingState = false;
												}, false, this);
								nextUI.show(true);
							}, false, this);
			currentUI.hide(true);
		} else {
			goog.events.listenOnce(nextUI,
					prism.theme.builder.ui.AbstractUI.EventType.SHOWN,
					function(e) {
						this.changingState = false;
					}, false, this);
			// show next ui
			nextUI.show(true);
		}
	}
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.getUIByState = function(state) {
	switch (state) {
	case prism.theme.builder.Builder.State.EDITOR:
		return this.builderUI;
	case prism.theme.builder.Builder.State.THEMES:
		return this.themesUI;
	case prism.theme.builder.Builder.State.VIEW:
		return this.overviewUI;
	default:
		return null;
	}
};

/**
 * @private
 */
prism.theme.builder.Builder.prototype.processLanguages = function() {
	this.languages = prism.theme.builder.model.LanguagePool.getInstance();
	this.tokens = prism.theme.builder.model.TokenPool.getInstance();
	this.theme = new prism.theme.builder.LanguageTheme();

	for ( var langProp in Prism["languages"]) {
		var lang = Prism["languages"][langProp];
		if (typeof lang !== 'function') {

			var language = new prism.theme.builder.model.Language(langProp);

			this.languages.addLanguage(language);

			// add default token
			this.processToken(language, null, "token", null);

			for ( var tokenProp in lang) {
				if (typeof lang[tokenProp] !== 'function') {
					this.processToken(language, null, tokenProp,
							lang[tokenProp]);
				}
			}
		}
	}

	/*
	 * ADD GLOBAL LANGUAGE
	 */
	this.languages.addLanguage(new prism.theme.builder.model.GlobalLanguage());
	/*
	 * APPLY DEFAULT THEME
	 */
	prism.theme.builder.LanguageThemeFactory.applyDefaultTheme(this.tokens,
			this.theme);

}

prism.theme.builder.Builder.prototype.processToken = function(lang,
		parentToken, tokenName, token) {
	var newParentToken = new prism.theme.builder.model.Token(parentToken,
			tokenName);

	/*
	 * register token in the global pool
	 */
	prism.theme.builder.model.TokenPool.getInstance().addToken(newParentToken);
	/*
	 * add token to language
	 */
	lang.addToken(newParentToken.getQualifiedName());
	/*
	 * prices tokens inside
	 */
	if (token != null && token["inside"] != null) {
		for ( var tokenProp in token["inside"]) {
			this.processToken(lang, newParentToken, tokenProp,
					token["inside"][tokenProp]);
		}
	}
}

/**
 * @return {prism.theme.builder.LanguageTheme} the theme
 */
prism.theme.builder.Builder.prototype.getTheme = function() {
	return this.theme;
};

/**
 * @return {prism.theme.builder.LanguageTheme} the viewTheme
 */
prism.theme.builder.Builder.prototype.getViewTheme = function() {
	return this.viewTheme;
};

/**
 * @return {prism.theme.builder.model.LanguagePool} the languages
 */
prism.theme.builder.Builder.prototype.getLanguages = function() {
	return this.languages;
};

/**
 * @return {prism.theme.builder.model.TokenPool} the tokens
 */
prism.theme.builder.Builder.prototype.getTokens = function() {
	return this.tokens;
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.updateToken = function(name, style) {
	if (this.canUpdateToken()) {
		this.currentToken.setStyle(name, style);
		this.update();
	}
};

prism.theme.builder.Builder.prototype.removeToken = function(name) {
	if (this.canUpdateToken()) {
		this.currentToken.removeStyle(name);
		this.update();
	}
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.tokenSelected = function(token) {
	this.currentToken = token;
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.downloadSelected = function(theme) {
	theme.download();
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.languageSelected = function(lang) {
	this.currentLanguage = lang;
	this.builderUI.fillCode(this.currentLanguage);
};

/**
 * @return {prism.theme.builder.TokenStyle} the currentToken
 */
prism.theme.builder.Builder.prototype.getCurrentToken = function() {
	return this.currentToken;
};

/**
 * @return {prism.theme.builder.model.Language} the currentLanguage
 */
prism.theme.builder.Builder.prototype.getCurrentLanguage = function() {
	return this.currentLanguage;
};

/**
 * 
 */
prism.theme.builder.Builder.prototype.canUpdateToken = function() {
	return this.currentToken != null;
};

prism.theme.builder.Builder.prototype.update = function() {
	var css = this.theme.toCSS(null, ".Builder-BuilderCodeRegion");
	/*
	 * INSERT/UPDATE CSS
	 */
	if (this.css == null) {
		this.css = goog.cssom.addCssText(css, null);
	} else {
		goog.dom.setTextContent(this.css, css);
	}
}

/**
 * @static
 */
prism.theme.builder.Builder.main = function() {
	var builder = new prism.theme.builder.Builder();
	builder.run();
}
