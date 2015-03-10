goog.provide("prism.theme.builder.model.GlobalLanguage");

goog.require("goog.array");
goog.require("prism.theme.builder.Constants");
goog.require("prism.theme.builder.model.Language");
goog.require("prism.theme.builder.model.LanguagePool");
goog.require("prism.theme.builder.model.TokenPool");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 * @extends {prism.theme.builder.model.Language}
 */
prism.theme.builder.model.GlobalLanguage = function() {
	prism.theme.builder.model.Language.call(this,
			prism.theme.builder.Constants.NAME);
	this.init();
}
goog.inherits(prism.theme.builder.model.GlobalLanguage,
		prism.theme.builder.model.Language);

prism.theme.builder.model.GlobalLanguage.prototype.init = function() {
	this.qualifiedTokenNames = null;

	var tokenPool = prism.theme.builder.model.TokenPool.getInstance().getPool();
	var languagePool = prism.theme.builder.model.LanguagePool.getInstance()
			.getLanguages();

	for ( var tokenProp in tokenPool) {
		var token = tokenPool[tokenProp];
		var tokenCount = 0;
		for ( var langProp in languagePool) {
			var lang = languagePool[langProp];
			if (lang.getTokens() != null
					&& goog.array.contains(lang.getTokens(), token
							.getQualifiedName())) {
				tokenCount++;
			}
		}
		if (tokenCount >= 2) {
			this.addToken(token.getQualifiedName());
		}
	}
};

/**
 * 
 */
prism.theme.builder.model.GlobalLanguage.prototype.isGlobal = function() {
	return true;
};
