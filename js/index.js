$('document').ready(function() {
	loadNewGoods2();
	loadNewGoods1();
});

function loadNewGoods2() {
	//загружаю товары на страницу новинки
	$.getJSON('goods.json', function(data) {

		var out = ' ';
		var newGoodsArray = [];
		
	
		for (var key in data) {
			if(data[key].new  === 1) {
				newGoodsArray.push(data[key]);
			}
		}
		
		//console.log(newGoodsArray);
		
		for (var key in newGoodsArray) {
				out+=`<div class="owl-item product_slider_item">
								<div class="product-item">
									<div class="product discount">
										<div class="product_image">
											<img src="${newGoodsArray[key].image}" alt="">
										</div>
										
										<div class="product_info">
											<h6 class="product_name"><a href="single.html">${newGoodsArray[key]['name'] }</a></h6>
											<div class="product_price">${newGoodsArray[key]['cost']}</span></div>
										</div>
									</div>
								</div>
							</div>`;
			
		}
	
		$('#js-new-items').html(out);
	})
	.done(function() {
	    initNewSlider2();
	});
}


function loadNewGoods1() {
	//загружаю товары на страницу все
	$.getJSON('goods.json', function(data) {

		var out = ' ';
		var allGoodsArray = [];
		
	
		for (var key in data) {
			if(data[key]){
				allGoodsArray.push(data[key]);
			}
		}
		
	
		
		for (var key in allGoodsArray) {
				out+=`<div class="owl-item product_slider_item">
								<div class="product-item">
									<div class="product discount">
										<div class="product_image">
											<img src="${allGoodsArray[key].image}" alt="">
										</div>
										<div class="product_info">
											<h6 class="product_name"><a href="single.html">${allGoodsArray[key]['name'] }</a></h6>
											<div class="product_price">${allGoodsArray[key]['cost']}</span></div>
										</div>
									</div>
								</div>
							</div>`;
			
		}
	
		$('#js-items').html(out);
	})
	.done(function() {
	    initNewSlider1();
	});
}
function initNewSlider2()
    {
    	if($('#js-new-items').length)
    	{
    		var slider1 = $('#js-new-items');

    		slider1.owlCarousel({
    			loop:false,
    			dots:false,
    			nav:false,
    			responsive:
				{
					0:{items:1},
					480:{items:2},
					768:{items:3},
					991:{items:4},
					1280:{items:5},
					1440:{items:5}
				}
    		});

    		if($('.product_slider_nav_left').length)
    		{
    			$('.product_slider_nav_left').on('click', function()
    			{
    				slider1.trigger('prev.owl.carousel');
    			});
    		}

    		if($('.product_slider_nav_right').length)
    		{
    			$('.product_slider_nav_right').on('click', function()
    			{
    				slider1.trigger('next.owl.carousel');
    			});
    		}
    	}
    }
    
    function initNewSlider1()
    {
    	if($('#js-items').length)
    	{
    		var slider1 = $('#js-items');

    		slider1.owlCarousel({
    			loop:false,
    			dots:false,
    			nav:false,
    			responsive:
				{
					0:{items:1},
					480:{items:2},
					768:{items:3},
					991:{items:4},
					1280:{items:5},
					1440:{items:5}
				}
    		});

    		if($('.product_slider_nav_left').length)
    		{
    			$('.product_slider_nav_left').on('click', function()
    			{
    				slider1.trigger('prev.owl.carousel');
    			});
    		}

    		if($('.product_slider_nav_right').length)
    		{
    			$('.product_slider_nav_right').on('click', function()
    			{
    				slider1.trigger('next.owl.carousel');
    			});
    		}
    	}
    }
    
    