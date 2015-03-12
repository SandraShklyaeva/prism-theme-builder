goog.provide("prism.theme.builder.LanguageThemeFactory");

goog.require("goog.object");
goog.require("prism.theme.builder.CodeBlockTokenStyle");
goog.require("prism.theme.builder.TokenStyle");
goog.require("prism.theme.builder.model.style.Style");
goog.require("prism.theme.builder.model.style.StyleConstants");

prism.theme.builder.LanguageThemeFactory.themes = {
	"prism" : {
		css : "prism.css"
	},
	"prism-coy" : {
		css : "prism-coy.css"
	},
	"prism-dark" : {
		css : "prism-dark.css"
	},
	"prism-funky" : {
		css : "prism-funky.css"
	},
	"prism-okaidia" : {
		css : "prism-okaidia.css"
	},
	"prism-tomorrow" : {
		title : "Tomorrow",
		css : "prism-tomorrow.css"
	},
	"prism-twilight" : {
		css : "prism-twilight.css"
	}
};

/**
 * 
 */
prism.theme.builder.LanguageThemeFactory.getCSSFile = function(themeName) {
	var cssFile = prism.theme.builder.LanguageThemeFactory.themes[themeName].css;
	if (typeof cssFile === "undefined") {
		return null;
	}
	return cssFile;
};

prism.theme.builder.LanguageThemeFactory.getAuthor = function(themeName) {
	if (typeof prism.theme.builder.LanguageThemeFactory.themes[themeName] === "undefined") {
		// unsupported theme
		return null;
	}
	var theme = components["themes"][themeName];
	if (typeof theme === "object") {
		var authorName = theme["owner"];
		if (typeof authorName !== "undefined") {
			return authorName;
		}
	}
	return null;
};

prism.theme.builder.LanguageThemeFactory.getLabel = function(themeName) {
	if (typeof prism.theme.builder.LanguageThemeFactory.themes[themeName] === "undefined") {
		// unsupported theme
		return themeName;
	}
	var theme = components["themes"][themeName];
	if (theme == null) {
		return prism.theme.builder.LanguageThemeFactory.themes[themeName].title;
	} else if (typeof theme === "object") {
		var title = theme["title"];
		if (typeof title !== "undefined") {
			return title;
		}
	} else if (typeof theme === "string") {
		return theme;
	}
	return themeName;
};

prism.theme.builder.LanguageThemeFactory.applyTheme = function(themeName, pool,
		theme) {
	theme.setName(themeName);

	prism.theme.builder.LanguageThemeFactory.applyGeneral(theme);

	switch (themeName) {
	case "prism":
		this.applyDefaultTheme(pool, theme);
		break;
	case "prism-coy":
		this.applyCoyTheme(pool, theme);
		break;
	case "prism-dark":
		this.applyDarkTheme(pool, theme);
		break;
	case "prism-funky":
		this.applyFunkyTheme(pool, theme);
		break;
	case "prism-okaidia":
		this.applyOkaidiaTheme(pool, theme);
		break;
	case "prism-tomorrow":
		this.applyTomorrowTheme(pool, theme);
		break;
	case "prism-twilight":
		this.applyTwilightTheme(pool, theme);
		break;
	}
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyTwilightTheme = function(pool,
		theme) {

	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("#141414"));
	blockToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("white"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);

		var markupToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), "markup");

		var cssToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), "css");

		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#777777"));
			break;
		case ".punctuation":
			markupToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#AC885B"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".tag":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#CF6A4C"));
			markupToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#CF6A4C"));
			break;
		case ".boolean":
		case ".number":
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#CF6A4C"));
			break;
		case ".keyword":
		case ".property":
		case ".selector":
		case ".constant":
		case ".symbol":
		case ".builtin":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#F9EE98"));
			break;
		case ".attr-name":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#8F9D6A"));
			markupToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#AC885B"));
			break;
		case ".attr-value":
		case ".char":
		case ".operator":
		case ".url":
		case ".variable":
		case ".inserted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#8F9D6A"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#8F9D6A"));
			markupToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#8F9D6A"));
			break;
		case ".entity":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#8F9D6A"));
			break;
		case ".atrule":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#7587A6"));
			break;
		case ".regex":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#E9C062"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#E9C062"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(cssToken);
			theme.addToken(markupToken);
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyTomorrowTheme = function(pool,
		theme) {

	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("#2d2d2d"));
	blockToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("#ccc"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".block-comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#999"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#ccc"));
			break;
		case ".namespace":
		case ".tag":
		case ".attr-name":
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e2777a"));
			break;
		case ".function-name":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#6196cc"));
			break;
		case ".boolean":
		case ".number":
		case ".function":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f08d49"));
			break;
		case ".property":
		case ".class-name":
		case ".constant":
		case ".symbol":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f8c555"));
			break;
		case ".selector":
		case ".atrule":
		case ".keyword":
		case ".builtin":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#cc99cd"));
			break;
		case ".string":
		case ".char":
		case ".attr-value":
		case ".regex":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#7ec699"));
			break;
		case ".operator":
		case ".entity":
		case ".url":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#67cdcc"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#cc99cd"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyOkaidiaTheme = function(pool,
		theme) {

	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("#272822"));
	blockToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("white"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("slategray"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f8f8f2"));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".property":
		case ".tag":
		case ".constant":
		case ".symbol":
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f92672"));
			break;
		case ".boolean":
		case ".number":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#ae81ff"));
			break;
		case ".selector":
		case ".attr-name":
		case ".char":
		case ".builtin":
		case ".inserted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a6e22e"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a6e22e"));
			var cssToken = new prism.theme.builder.TokenStyle(token
					.getQualifiedName(), token.getCSSName(), "css");
			cssToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f8f8f2"));
			theme.addToken(cssToken);
			break;
		case ".operator":
		case ".entity":
		case ".url":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#f8f8f2"));
			break;
		case ".atrule":
		case ".attr-value":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e6db74"));
			break;
		case ".keyword":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#66d9ef"));
			break;
		case ".regex":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#fd971f"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#fd971f"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyFunkyTheme = function(pool, theme) {

	var codeRegion = theme.getCodeRegionToken();
	codeRegion
			.setStyle(
					prism.theme.builder.model.style.StyleConstants.BACKGROUND,
					new prism.theme.builder.model.style.Style(
							"url('data:image/svg+xml;charset=utf-8,<svg%20version%3D\"1.1\"%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20width%3D\"100\"%20height%3D\"100\"%20fill%3D\"rgba(0%2C0%2C0%2C.2)\">%0D%0A<polygon%20points%3D\"0%2C50%2050%2C0%200%2C0\"%20%2F>%0D%0A<polygon%20points%3D\"0%2C100%2050%2C100%20100%2C50%20100%2C0\"%20%2F>%0D%0A<%2Fsvg>');"));
	codeRegion.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_SIZE,
			new prism.theme.builder.model.style.Style("1em 1em"));

	var codeToken = theme.getCodeBlockToken();
	codeToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("black"));
	codeToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("white"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#aaa"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#999"));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".property":
		case ".tag":
		case ".boolean":
		case ".number":
		case ".constant":
		case ".symbol":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#0cf"));
			break;
		case ".selector":
		case ".attr-name":
		case ".char":
		case ".builtin":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("yellow"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("yellow"));
			var cssToken = new prism.theme.builder.TokenStyle(token
					.getQualifiedName(), token.getCSSName(), "css");
			cssToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("yellowgreen"));
			theme.addToken(cssToken);
			break;
		case ".operator":
		case ".entity":
		case ".url":
		case ".inserted":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("yellowgreen"));
			break;
		case ".atrule":
		case ".attr-value":
		case ".keyword":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("deeppink"));
			break;
		case ".regex":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("orange"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("orange"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("red"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyDarkTheme = function(pool, theme) {

	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("white"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.LINE_HEIGHT,
			new prism.theme.builder.model.style.Style(1.5));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("#4D4033"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#997F66"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".property":
		case ".tag":
		case ".boolean":
		case ".number":
		case ".constant":
		case ".symbol":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#D1939E"));
			break;
		case ".selector":
		case ".attr-name":
		case ".char":
		case ".builtin":
		case ".inserted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#BCE051"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#BCE051"));
			var cssToken = new prism.theme.builder.TokenStyle(token
					.getQualifiedName(), token.getCSSName(), "css");
			cssToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#F4B73D"));
			theme.addToken(cssToken);
			break;
		case ".operator":
		case ".entity":
		case ".url":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#F4B73D"));
			break;
		case ".atrule":
		case ".attr-value":
		case ".keyword":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#D1B293"));
			break;
		case ".regex":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("red"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyDefaultTheme = function(pool,
		theme) {
	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("slategray"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#999"));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style(0.7));
			break;
		case ".property":
		case ".tag":
		case ".boolean":
		case ".number":
		case ".constant":
		case ".symbol":
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#905"));
			break;
		case ".selector":
		case ".attr-name":
		case ".char":
		case ".builtin":
		case ".inserted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#690"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#690"));
			var cssToken = new prism.theme.builder.TokenStyle(token
					.getQualifiedName(), token.getCSSName(), "css");
			cssToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a67f59"));
			theme.addToken(cssToken);
			break;
		case ".operator":
		case ".entity":
		case ".url":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a67f59"));
			break;
		case ".atrule":
		case ".attr-value":
		case ".keyword":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#07a"));
			break;
		case ".function":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#DD4A68"));
			break;
		case ".regex":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

/**
 * @param {prism.theme.builder.model.TokenPool}
 *            pool
 * @param {prism.theme.builder.LanguageTheme}
 *            theme
 */
prism.theme.builder.LanguageThemeFactory.applyCoyTheme = function(pool, theme) {

	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.BACKGROUND_COLOR,
			new prism.theme.builder.model.style.Style("#fdfdfd"));
	blockToken.setStyle(prism.theme.builder.model.style.StyleConstants.COLOR,
			new prism.theme.builder.model.style.Style("black"));

	goog.object.forEach(pool.getPool(), function(token, tokenName, tokens) {
		var styleToken = new prism.theme.builder.TokenStyle(token
				.getQualifiedName(), token.getCSSName(), null);
		var add = true;
		switch (token.getCSSName()) {
		case ".comment":
		case ".block-comment":
		case ".prolog":
		case ".doctype":
		case ".cdata":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#7D8B99"));
			break;
		case ".punctuation":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#5F6364"));
			break;
		case ".property":
		case ".tag":
		case ".boolean":
		case ".number":
		case ".function-name":
		case ".constant":
		case ".symbol":
		case ".deleted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#c92c2c"));
			break;
		case ".selector":
		case ".attr-name":
		case ".char":
		case ".function":
		case ".builtin":
		case ".inserted":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#2f9c0a"));
			break;
		case ".string":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#2f9c0a"));
			var cssToken = new prism.theme.builder.TokenStyle(token
					.getQualifiedName(), token.getCSSName(), "css");
			cssToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a67f59"));
			theme.addToken(cssToken);
			break;
		case ".operator":
		case ".entity":
		case ".url":
		case ".variable":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#a67f59"));
			break;
		case ".atrule":
		case ".attr-value":
		case ".keyword":
		case ".class-name":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#1990b8"));
			break;
		case ".regex":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			break;
		case ".important":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.COLOR,
					new prism.theme.builder.model.style.Style("#e90"));
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("normal"));
			break;
		case ".bold":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_WEIGHT,
					new prism.theme.builder.model.style.Style("bold"));
			break;
		case ".italic":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.FONT_STYLE,
					new prism.theme.builder.model.style.Style("italic"));
			break;
		case ".namespace":
			styleToken.setStyle(
					prism.theme.builder.model.style.StyleConstants.OPACITY,
					new prism.theme.builder.model.style.Style("0.7"));
			break;
		default:
			add = false;
			break;
		}
		if (add) {
			theme.addToken(styleToken);
		}
	}, null);
};

prism.theme.builder.LanguageThemeFactory.applyGeneral = function(theme) {
	var blockToken = theme.getCodeRegionToken();
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.FONT_FAMILY,
			new prism.theme.builder.model.style.Style(
					"Consolas, Monaco, 'Andale Mono', monospace"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.DIRECTION,
			new prism.theme.builder.model.style.Style("ltr"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.TEXT_ALIGN,
			new prism.theme.builder.model.style.Style("left"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.WHITE_SPACE,
			new prism.theme.builder.model.style.Style("pre"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.WORD_SPACING,
			new prism.theme.builder.model.style.Style("normal"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.WORD_BREAK,
			new prism.theme.builder.model.style.Style("normal"));
	blockToken.setStyle(
			prism.theme.builder.model.style.StyleConstants.LINE_HEIGHT,
			new prism.theme.builder.model.style.Style(1.5));
}