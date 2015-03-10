goog.provide("prism.theme.builder.model.TokenPool");

/**
 * @constructor
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.model.TokenPool = function() {

};
goog.addSingletonGetter(prism.theme.builder.model.TokenPool);
/**
 * @type {Object}
 */
prism.theme.builder.model.TokenPool.prototype.pool = null;

/**
 * @param {prism.theme.builder.model.Token} token
 */
prism.theme.builder.model.TokenPool.prototype.addToken = function(token) {
	if (this.pool == null) {
		this.pool = {};
	}
	this.pool[token.getQualifiedName()] = token;
};

/**
 * @return {prism.theme.builder.model.Token}
 */
prism.theme.builder.model.TokenPool.prototype.getToken = function(name) {
	return this.pool[name];
};

/**
 * @return {Object} the pool
 */
prism.theme.builder.model.TokenPool.prototype.getPool = function() {
	return this.pool;
};
