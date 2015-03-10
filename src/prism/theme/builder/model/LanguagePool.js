goog.provide("prism.theme.builder.model.LanguagePool");

goog.require("prism.theme.builder.Constants");


/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.model.LanguagePool = function() {

};
goog.addSingletonGetter(prism.theme.builder.model.LanguagePool);
/**
 * @private
 */
prism.theme.builder.model.LanguagePool.prototype.languages = null;

/**
 * 
 */
prism.theme.builder.model.LanguagePool.prototype.addLanguage = function(lang) {
	if (this.languages == null) {
		this.languages = {};
	}
	this.languages[lang.getName()] = lang;
};

/**
 * @return {Object} the languages
 */
prism.theme.builder.model.LanguagePool.prototype.getLanguages = function() {
	return this.languages;
};

/**
 * 
 */
prism.theme.builder.model.LanguagePool.prototype.getGlobalLanguage = function() {
	return this.languages[prism.theme.builder.Constants.NAME];
};