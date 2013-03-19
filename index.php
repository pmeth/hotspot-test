<!DOCTYPE html>
<html>
   <head>
      <meta http-equiv="content-type" content="text/html; charset=UTF-8">
      <title>Clickable markers on an image</title>

      <script type='text/javascript' src='http://code.jquery.com/jquery-2.0.0b1.js'></script>

      <style type='text/css'>
         body {
            overflow:hidden;
            padding:0;margin:0;
            height:100%;width:100%;
            position: relative;
         }

      </style>

      <script type='text/javascript'>//<![CDATA[
         var $map, w_orig, h_orig, ratio, factor = 1;
         var markers = [
            {left: 230, top: 226, data: "I'm in the middle"},
            {left: 190, top: 36, data: "Hey diddle diddle"},
            {left: 258, top: 400, data: "Wassup??"}
         ];

         var popmarker = function(data) {

            alert(data.marker.data);
         }
            
         var move_markers = function(factor) {
            for (var i in markers) {
               markers[i].$el.css({
                  left: markers[i].left * factor - markers[i].shift_left,
                  top: markers[i].top * factor - markers[i].shift_top,
                  position: 'absolute'
               });
            }
         }
         
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
            
         $(window).load(function(){

            for (var i in markers) {
               marker = markers[i];
               marker.$el = $('<div class="marker" id="marker_' + i + '" />')
               .css({left: marker.left, top: marker.top, position: 'absolute'})
               .html("<img src='http://cdn1.iconfinder.com/data/icons/iconbeast-lite/30/plus-sign.png'>")
               .click({index: i, marker: marker}, function(e) {
                  popmarker(e.data);
               })
               ;
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
         });//]]>

      </script>


   </head>
   <body>
      <img id='map' src='http://dummyimage.com/500x500.jpg'>
   </body>
</html>