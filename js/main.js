var Application = {};
var $map, w_orig, h_orig, ratio, factor = 1;
var markers = [
	{left: 230, top: 226, data: "I'm in the middle"},
	{left: 190, top: 36, data: "Hey diddle diddle"},
	{left: 258, top: 400, data: "Wassup??"}
];

var popmarker = function(data) {

	alert(data.marker.data);
};

var move_markers = function(factor) {
	for (var i in markers) {
		markers[i].$el.css({
			left: markers[i].left * factor - markers[i].shift_left,
			top: markers[i].top * factor - markers[i].shift_top,
			position: 'absolute'
		});
	}
};

var resize_img = function() {
	var w = $(window).innerWidth();
	var h = $(window).innerHeight();

	if (w / w_orig < h / h_orig) {
		$map.width(w).height(w / ratio);
		factor = w / w_orig;
	} else {
		$map.height(h).width(h * ratio);
		factor = h / h_orig;
	}

	move_markers(factor);

};

var run = function(){

	for (var i in markers) {
		marker = markers[i];
		marker.$el = $('<div class="marker" id="marker_' + i + '" />');
		marker.$el.css({left: marker.left, top: marker.top, position: 'absolute'});
		marker.$el.html("<img src='http://cdn1.iconfinder.com/data/icons/iconbeast-lite/30/plus-sign.png'>");
		marker.$el.click({index: i, marker: marker}, popmarker);
		$('body').append(marker.$el);

		marker.shift_left = marker.$el.width() / 2;
		marker.shift_top = marker.$el.height() / 2;

	}

	$map = $('#map');
	//var abs_shift_left = $abs.width() / 2;
	//var abs_shift_top = $abs.height() / 2;

	//abs_left += abs_shift_left;
	//abs_top += abs_shift_top;

	w_orig = $map.width();
	h_orig = $map.height();
	ratio = w_orig / h_orig;
	factor = 1;


	resize_img();
	$(window).resize(resize_img);
};

