function Map($el) {
	this.$el = $el;
	this.width_orig = undefined;
	this.height_orig = undefined;
	this.ratio = undefined;
	this.factor = undefined;

	this.init = function() {
		this.width_orig = $el.width();
		this.height_orig = $el.height();
		this.ratio = this.width_orig / this.height_orig;
		this.factor = 1;

		this.fit();
	};

	this.fit = function(width, height) {
		if (width / this.width_orig < height / this.height_orig) {
			this.$el.width(width).height(width / this.ratio);
			this.factor = width / this.width_orig;
		} else {
			this.$el.height(height).width(height * this.ratio);
			this.factor = height / this.height_orig;
		}
	};

}

function Marker($el, data) {
	this.$el = $el;
	this.left = data.left;
	this.top = data.top;
	this.data = data.data;
	this.shift_left = $el.width() / 2;
	this.shift_top = $el.height() / 2;
		//abs_left += abs_shift_left;
		//abs_top += abs_shift_top;
	this.popmarker = function(e) {
		console.log(arguments);
		alert(this.data);
	};
}

function MarkerCollection(marker_data) {
	this.markers = [];
	var marker;
	var $el;
	for (var i in marker_data) {
		marker = marker_data[i];
		$el = $('<div />');
		$el.css({left: marker.left, top: marker.top, position: 'absolute'});
		$el.html("<img src='http://cdn1.iconfinder.com/data/icons/iconbeast-lite/30/plus-sign.png'>");
		$('body').append($el);
		marker_obj = new Marker($el, marker);
		marker_obj.$el.click($.proxy(marker_obj.popmarker, marker_obj));
		this.markers.push(marker_obj);
	}

	this.reposition = function(factor) {
		var marker;
		for (var i in this.markers) {
			marker = this.markers[i];
			marker.$el.css({
				left: marker.left * factor - marker.shift_left,
				top: marker.top * factor - marker.shift_top,
				position: 'absolute'
			});
		}
	};

}

function Application(map, marker_data) {
	this.map = new Map(map);
	this.map.init();

	this.markers = new MarkerCollection(marker_data);

	this.resize_map = function() {
		var width = $(window).innerWidth();
		var height = $(window).innerHeight();

		$.proxy(this.map.fit(width, height), this.map);
		$.proxy(this.markers.reposition(this.map.factor), this.markers);
	};

	this.run = function(){
		this.resize_map();
		$(window).resize($.proxy(this.resize_map, this));
	};
}
