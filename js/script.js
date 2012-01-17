/* Author: Zoe Blair

*/

$(document).ready(function() {
	$('#quiz').before('<div id="summary"><ol></ol></div>');
	$('#quiz li').each(function(){
		$('#summary ol').append('<li rel="'+$(this).attr('id')+'">'+$(this).children('h3').text()+'</li>');
	});
	$('#summary li:first-child').addClass('current');
	
	
   
	preload("img/paper_top.png");
	preload("img/paper_left.png");
	preload("img/paper_center.jpg");
	preload("img/paper_right.png");
	preload("img/paper_bottom.png");
	
	$("canvas").live("click", function(){
		$(this).hide();
		//done game?
		if($("#quiz li.current").length == 0) {
			$("#dialog").removeClass("hidden");
			$("#greenscreen").addClass("closeme");
			$("#finaltaxes").text("$"+$("#totaltaxes").text());
		}else{
			$("#greenscreen").addClass("hidden");
		}
	});
	
	$(".closeme").live("click", function(){
			$("#greenscreen").addClass("hidden").removeClass("closeme");
			$("#dialog").addClass("hidden");		
			$("canvas").hide();
	});
	
	$("#quiz label").click(function(){
		$("canvas").hide();
		choice = $('#'+$(this).attr('for')).val();
		if($(this).parent('li').children('p.'+choice+'1').length > 0) {
			//change taxes
			if(choice == "increase") {
				var current = parseFloat($("#totaltaxes").text().replace(",", ""));
				
				current += (current * parseFloat($(this).parent('li').children('input[type=hidden]').val() / 100));
				current = Math.round(current);
				current += '';
				x = current.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				current = x1 + x2;


				
				$("#totaltaxes").text(current);
			}
			//newsflash
			news1 = $(this).parent('li').children('p.'+choice+"1").text();
			news2 = $(this).parent('li').children('p.'+choice+"2").text();
			news3 = $(this).parent('li').children('p.'+choice+"3").text();
			
			$("#greenscreen").removeClass("hidden");
			
			setTimeout(function(){
				$("#greenscreen").addClass("closeme");
			}, 500);
			newspaper(news1, news2, news3);
		}
		var id = $(this).parent("li").next("li").attr("id");
		showquestion(id);
		$('#summary .current').removeClass("current").addClass(choice).addClass("done").next("li").addClass("current");
	});
	
 });
 
function showquestion(id){
	$("#quiz li.current").removeClass("current");
	$("#"+id).addClass("current");	
}
 
function newspaper(line1, line2, subtitle){
	if(!$("html").hasClass("canvas")) {
		return true;
	}
			while(loaded < 5) {
				//...
			}
				var canvas	= document.createElement("canvas"),
				c		= canvas.getContext("2d");
		
			canvas.width = 717;
			canvas.height = 526;

			c.drawImage( getimg("img/paper_top.png"), 0, 0 );
			c.drawImage( getimg("img/paper_left.png"), 0, 12 );
			c.drawImage( getimg("img/paper_center.jpg"), 14, 12 );
			c.drawImage( getimg("img/paper_right.png"), 711, 12 );
			c.drawImage( getimg("img/paper_bottom.png"), 0, 516 );
			
			// Drawing the text using our helper
			// function (see at the bottom):
			
			drawText( line1, line2, subtitle, c, 358, 250 );
			
			// Appending the element to the page.
			// This triggers the CSS3 animation.
			
			
			$("body").append(canvas);
			
}
var loaded = 0;
function preload(src){
	var img = new Image();
	img.src = src;
	img.onload = function(){
		loaded++;
	};
}
function getimg(src){
	var img = new Image();
	img.src = src;
	return img;
}
function drawText( line1, line2, subtitle, c, x, y ){
	c.font = "65px Anton,Calibri";
	c.textAlign = "center";
	c.fillStyle = "#3e3e3e";
	
	c.fillText(line1.toUpperCase(),x,y);
	c.fillText(line2.toUpperCase(),x,y+80);
	
	c.font = "italic 20px Georgia,serif";
	c.fillStyle = "#737373";
	
	c.fillText(subtitle,x,y+120);
}

(function(){
	
	// Adding custom checks for canvas and css3
	// animations support, to the jQuery.support object:
	
	$.support.canvas = 'getContext' in document.createElement('canvas');
	
	$.support.css3Animation = (function(){
		var sp = $('<span>');
		
		return (
			sp.css("-webkit-animation") !== undefined	||
			sp.css("-moz-animation") !== undefined		||
			sp.css("animation") !== undefined
		);
		
	})();
})();
















