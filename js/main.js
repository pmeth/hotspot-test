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

function Marker(data) {
	this.$el = undefined;
	this.width = undefined;
	this.height = undefined;
	this.left = data.left;
	this.top = data.top;
	this.data = data.data;
	this.center = undefined;
	this.is_open = false;
	this.$popup = undefined;

	this.popmarker = function(e) {
		if (this.is_open) {
			this.close();
		} else {
			this.open();
		}
	};
	this.open = function() {
		var el_position = this.$el.position();
		this.$popup = $('<span />');
		this.$popup.html(this.data);
		this.$popup.css({
			backgroundColor: 'white',
			padding: 5,
			border: '3px solid black',
			position: 'absolute',
			top: el_position.top,
			left: el_position.left + 40
		});
		$('body').append(this.$popup);
		this.is_open = true;
	};

	this.close = function() {
		this.$popup.remove();
		this.is_open = false;
	};

	this.reposition = function(factor) {
		this.shift_left = this.$el.width() / 2;
		this.shift_top = this.$el.height() / 2;
		this.center = {
			x: this.left + this.shift_left,
			y: this.top + this.shift_top
		};
		this.$el.css({
			left: this.center.x * factor - this.shift_left,
			top: this.center.y * factor - this.shift_top,
			position: 'absolute'
		});
	};


	this.initElement = function() {
		this.$el = $('<div />');
		this.$el.html("<img width='29' height='30' src='http://cdn1.iconfinder.com/data/icons/iconbeast-lite/30/plus-sign.png'>");
		this.$el.click($.proxy(this.popmarker, this));
		$('body').append(this.$el);

		this.reposition(1);
	};

	this.initElement();
}

function MarkerCollection(marker_data) {
	this.markers = [];
	var marker;
	for (var i in marker_data) {
		this.markers.push(new Marker(marker_data[i]));
	}

	this.reposition = function(factor) {
		for (var i in this.markers) {
			$.proxy(this.markers[i].reposition(factor), this.markers[i]);
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
