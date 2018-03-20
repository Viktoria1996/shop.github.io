var cart = {}; //моя корзина



$('document').ready(function() {
	loadGoods();
	checkCart();
	showMiniCart();
});

function loadGoods() {
	//загружаю товары на страницу
	$.getJSON('goods.json', function(data) {

		var out = ' ';
		for (var key in data) {
			out += '<div class="single-goods">';
			out += '<img src="' + data[key].image + '">';
			out += '<p>' + data[key]['name'] + '</p>';
			out += '<p>Цена: ' + data[key]['cost'] + ' бел.руб.</p>';
			out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
			out += '</div>';
		}
		$('#goods').html(out);
		$('button.add-to-cart').on('click', addToCart);
	});
}

function addToCart() {
	//добавляем товар в корзину

	var artikul = $(this).attr('data-art');
	if (cart[artikul] != undefined) {
		cart[artikul]++;
	}
	else {
		cart[artikul] = 1;
	}
	localStorage.setItem('cart', JSON.stringify(cart));

	plusTotalCount();


	//console.log(cart);
	showMiniCart();
}


function checkCart() {
	//проверяю наличие корзины в LocalStorage
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

function showMiniCart() {
	//показываю содержимое корзины
	var out = '';
	for (var w in cart) {
		out += w + ' --- ' + cart[w] + '<br>';
	}
	$('#mini-cart').html(out);
}


function plusTotalCount() {
	totalCount++;
	localStorage.setItem('totalCount', totalCount);
	showCount();
}

// фильтрация по категориям
$(".sidebar_categories li").click(function() {
	var cat = $(this).data('category');
	
	$(".sidebar_categories li").removeClass('active');
	$(this).addClass('active');


	$.getJSON('goods.json', function(data) {

		var out = ' ';
		var filteredArray = [];
	
		for (var key in data) {
			if(data[key].categories  === cat) {
				filteredArray.push(data[key]);
			}
		}
		
		for (var key in filteredArray) {
			out += '<div class="single-goods">';
			out += '<img src="' + filteredArray[key].image + '">';
			out += '<p>' + filteredArray[key]['name'] + '</p>';
			out += '<p>Цена: ' + filteredArray[key]['cost'] + ' бел.руб.</p>';
			out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
			out += '</div>';
		}
		$('#goods').html(out);
		$('button.add-to-cart').on('click', addToCart);
	});

});


$(".sidebar_categories li.js-new").click(function() {

	$.getJSON('goods.json', function(data) {

		var out = ' ';
		var filteredArray = [];
		
	
		for (var key in data) {
			if(data[key].new  === 1) {
				filteredArray.push(data[key]);
			}
		}
		
		for (var key in filteredArray) {
			out += '<div class="single-goods">';
			out += '<img src="' + filteredArray[key].image + '">';
			out += '<p>' + filteredArray[key]['name'] + '</p>';
			out += '<p>Цена: ' + filteredArray[key]['cost'] + ' бел.руб.</p>';
			out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
			out += '</div>';
		}
		$('#goods').html(out);
		$('button.add-to-cart').on('click', addToCart);
	});

});




								

// сортировка по категориям
$(".sorting_type li").click(function() {
	var cat = $(this).data('sort');
	
	$(".sorting_type li").removeClass('active');
	$(this).addClass('active');


	$.getJSON('goods.json', function(data) {

		var out = ' ';
		var sortedArray = [];
	
		switch (cat) {
			case 'price':
				sortedArray = sortByPrice(data);
				break;
			case 'name':
				sortedArray = sortByName(data);
				break;
			default:;
		}
	
		
		
		for (var key in sortedArray ) {
			out += '<div class="single-goods">';
			out += '<img src="' + sortedArray[key].image + '">';
			out += '<p>' + sortedArray[key]['name'] + '</p>';
			out += '<p>Цена: ' + sortedArray[key]['cost'] + ' бел.руб.</p>';
			out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
			out += '</div>';
		}
		$('#goods').html(out);
		$('button.add-to-cart').on('click', addToCart);
	});

});

function sortByPrice(data){

		for (var key in data) {
			// if(data[key].categories  === cat) {
			// 	sortedArray.push(data[key]);
			// }
		}
		
		return sortedArray;
};


// // sort by value
// items.sort(function (a, b) {
//   return a.value - b.value;
// });

// // sort by name
// items.sort(function(a, b) {
//   var nameA = a.name.toUpperCase(); // ignore upper and lowercase
//   var nameB = b.name.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });