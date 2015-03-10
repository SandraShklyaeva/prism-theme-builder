goog.provide("prism.theme.builder.ui.LanguageSelectedEvent");

goog.require("goog.events.Event");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 *
 * @param {*} type
 * @param {Object} opt_target
 * @extends {goog.events.Event}
 */
prism.theme.builder.ui.LanguageSelectedEvent = function(lang, type, opt_target) {
	goog.events.Event.call(this, type, opt_target);
	this.lang = lang;
}
goog.inherits(prism.theme.builder.ui.LanguageSelectedEvent, goog.events.Event);

/**
 * @return {any} the language
 */
prism.theme.builder.ui.LanguageSelectedEvent.prototype.getLanguage = function() {
	return this.lang;
};