<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>太平保险-投保联合</title>

<script type="text/javascript" src="js/application.js"></script>
<script type="text/javascript">

	taiping.css("/base.css");
	//import js
	taiping.lib.requirejs("/require.js", function() {
		//config requirejs
		requirejs.config({
			baseUrl : "js/requirejs/" + version.requirejs,
			paths : {
				jQuery : "../../jquery/" + version.jQuery,
				taiping : "../../taiping/" + version.taiping
			},
			config : {
				i18n : {
					locale : "zh"
				}
			}
		});
		console.log("--------load success-------");
		//load application
		require([ "taiping/app/insureEdit" ], function() {
			console.log("insureEdit.js completed");
		});
	});
</script>
</head>
<body>太平保险-投保联合
</body>
</html>