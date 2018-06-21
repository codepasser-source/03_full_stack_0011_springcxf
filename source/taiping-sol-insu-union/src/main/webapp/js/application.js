(function(window, undefined) {
	var version = {
		jQuery : "1.9.1",
		requirejs : "2.1.6",
		taiping : "1.0"
	};

	taiping = function() {
		return new taiping.prototype.init();
	};

	taiping.prototype = {
		constructor : taiping,
		init : function() {
		}
	// 可在这里添加实例方法
	};

	taiping.prototype.init.prototype = taiping.prototype;

	taiping.extend = taiping.prototype.extend = function() {
		var src, copy, name, options, target = arguments[0] || {}, i = 1, length = arguments.length;

		// extend jQuery itself if only one argument is passed
		if (length === i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Don't bring in undefined values
					if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	// 静态方法
	taiping.lib = function(libId, callback) {
		importJavaScript(taipingResourcePath(libId), callback);
	};

	taiping.extend(taiping.lib, {

		jQuery : function(libId, callback) {
			importJavaScript(jQueryResourcePath(libId), callback);
		},

		requirejs : function(libId, callback) {
			importJavaScript(requirejsResourcePath(libId), callback);
		}
	});

	taiping.css = function(styleId) {
		importCSSStyle(taipingStyleResourcePath(styleId));
	};

	// 内部方法，不对外公开
	function jQueryResourcePath(resourceId) {
		return "js/jquery/" + version.jQuery + resourceId;
	}

	function requirejsResourcePath(resourceId) {
		return "js/requirejs/" + version.requirejs + resourceId;
	}

	function taipingResourcePath(resourceId) {
		return "js/taiping/" + version.taiping + resourceId;
	}

	function taipingStyleResourcePath(styleId) {
		return "css/taiping" + styleId;
	}

	function importJavaScript(path, callback) {
		var script, head = document.head || document.documentElement;
		script = document.createElement("script");
		script.type = "text/javascript";
		// script.async = true;
		script.charset = "UTF-8";
		script.src = path;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function(_) {

			if (!script.readyState || /loaded|complete/.test(script.readyState)) {

				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;

				// Remove the script
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

				// Dereference the script
				script = null;

				// Callback
				if (callback) {
					callback.call();
				}
			}
		};

		// Circumvent IE6 bugs with base elements (#2709 and #4378) by
		// prepending
		// Use native DOM manipulation to avoid our domManip AJAX trickery
		head.insertBefore(script, head.firstChild);
	}

	// 引入样式
	function importCSSStyle(path, id) {
		var style = undefined;
		if (id != undefined) {
			style = document.getElementById(id);
		}
		if (style == undefined) {
			style = document.createElement("link");
			if (id != undefined) {
				style.id = id;
			}
		}
		style.type = "text/css";
		style.rel = "stylesheet";
		style.href = path;
		document.getElementsByTagName("HEAD")[0].appendChild(style);
	}

	window.taiping = taiping;
	window.version = version;

	// EXT=============================================================================
	// 当页面引入该JS之后，可在下面做一些初始化的操作，
	// 但是需要注意的是将影响到所有引用该文件的页面。

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	Date.prototype.Format = function(fmt) { // author: meizz
		var o = {
			"M+" : this.getMonth() + 1, // 月份
			"d+" : this.getDate(), // 日
			"h+" : this.getHours(), // 小时
			"m+" : this.getMinutes(), // 分
			"s+" : this.getSeconds(), // 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
			"S" : this.getMilliseconds()
		// 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
						: (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	/* 得到日期年月日等加数字后的日期 */
	Date.prototype.dateAdd = function(interval, number) {
		var d = this;
		var k = {
			'y' : 'FullYear',
			'q' : 'Month',
			'm' : 'Month',
			'w' : 'Date',
			'd' : 'Date',
			'h' : 'Hours',
			'n' : 'Minutes',
			's' : 'Seconds',
			'ms' : 'MilliSeconds'
		};
		var n = {
			'q' : 3,
			'w' : 7
		};
		eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+'
				+ ((n[interval] || 1) * number) + ')');
		return d;
	};
	/* 计算两日期相差的日期年月日等 */
	Date.prototype.dateDiff = function(interval, objDate2) {
		var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
		i['y'] = objDate2.getFullYear() - d.getFullYear();
		i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4)
				- Math.floor(d.getMonth() / 4);
		i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
		i['ms'] = objDate2.getTime() - d.getTime();
		i['w'] = Math.floor((t2 + 345600000) / (604800000))
				- Math.floor((t + 345600000) / (604800000));
		i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
		i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
		i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
		i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
		return i[interval];
	};
	// EXT=============================================================================
})(window);
