function Application(markers) {
	this.$map = undefined;
	this.w_orig = undefined;
	this.h_orig = undefined;
	this.ratio = undefined;
	this.factor = 1;
	this.markers = markers;

	this.popmarker = function(data) {
		alert(data.marker.data);
	};

	this.move_markers = function(factor) {
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

	this.resize_img = function() {
		var w = $(window).innerWidth();
		var h = $(window).innerHeight();

		if (w / this.w_orig < h / this.h_orig) {
			this.$map.width(w).height(w / this.ratio);
			this.factor = w / this.w_orig;
		} else {
			this.$map.height(h).width(h * this.ratio);
			this.factor = h / this.h_orig;
		}

		this.move_markers(this.factor);

	};

	this.run = function(){

		for (var i in this.markers) {
			marker = this.markers[i];
			marker.$el = $('<div class="marker" id="marker_' + i + '" />');
			marker.$el.css({left: marker.left, top: marker.top, position: 'absolute'});
			marker.$el.html("<img src='http://cdn1.iconfinder.com/data/icons/iconbeast-lite/30/plus-sign.png'>");
			marker.$el.click({index: i, marker: marker}, this.popmarker);
			$('body').append(marker.$el);

			marker.shift_left = marker.$el.width() / 2;
			marker.shift_top = marker.$el.height() / 2;

		}

		this.$map = $('#map');
		//var abs_shift_left = $abs.width() / 2;
		//var abs_shift_top = $abs.height() / 2;

		//abs_left += abs_shift_left;
		//abs_top += abs_shift_top;

		this.w_orig = this.$map.width();
		this.h_orig = this.$map.height();
		this.ratio = this.w_orig / this.h_orig;
		this.factor = 1;


		this.resize_img();
		$(window).resize($.proxy(this.resize_img, this));
	};
}
