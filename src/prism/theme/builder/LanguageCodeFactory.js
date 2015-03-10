goog.provide("prism.theme.builder.LanguageCodeFactory");

goog.require("goog.net.XhrIo");

/**
 * @author Sandra https://github.com/SandraShklyaeva
 * 
 */
prism.theme.builder.LanguageCodeFactory.getCode = function(lang, callback, obj) {
	var code = prism.theme.builder.LanguageCodeFactory.codes[lang.getName()];
	if (typeof code === 'undefined') {

		var url = "file:///C:/Users/daginno/workspaces/closureide2/prism-theme-builder/examples/"
				+ lang.getName();

		if (lang.isGlobal()) {
			url = "file:///C:/Users/daginno/workspaces/closureide2/prism-theme-builder/examples/javascript";
		}

		goog.net.XhrIo.send(url,
				function(e) {
					var xhr = e.target;
					var result = xhr.getResponseText();
					prism.theme.builder.LanguageCodeFactory.codes[lang
							.getName()] = result;
					if (callback != null) {
						callback.call(obj, result);
					}
				});
	} else if (callback != null) {
		callback.call(obj, code);
	}
	return code;
};

prism.theme.builder.LanguageCodeFactory.codes = {};

prism.theme.builder.LanguageCodeFactory.registerCode = function(lang, code) {
	prism.theme.builder.LanguageCodeFactory.codes[lang] = code;
}

prism.theme.builder.LanguageCodeFactory.getJavaScriptCode = function() {
	return "function(){return 1 + \"dag\";\n var a = new Object({bobo:'123', name: 'dag', age;22});}";
};

prism.theme.builder.LanguageCodeFactory.getCSSCode = function() {
	return "#id .class {align: center; background: red;}";
};
