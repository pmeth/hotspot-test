<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Clickable markers on an image</title>
		<link rel="stylesheet" href="css/main.css" title="Default Style" type="text/css" />
	</head>
	<body>
		<img id='map' width='500' height='500' src='http://dummyimage.com/500x500.jpg'>

			<!-- das Scripts -->
		<script type='text/javascript' src='http://code.jquery.com/jquery-1.9.1.min.js'></script>
		<script type='text/javascript' src='js/main.js'></script>
		<script type='text/javascript'>
			var app = new Application($('#map'), [
				{left: 230, top: 226, data: "I'm in the middle<br><img src='http://dummyimage.com/250x180.jpg'>"},
				{left: 190, top: 36, data: "Hey diddle diddle"},
				{left: 258, top: 400, data: "Wassup??"}
			]);
			$(function(){
				app.run();
			});
		</script>
	</body>
</html>
