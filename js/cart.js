var cart = {}; //корзина
var totalCost;


$.getJSON('goods.json', function(data) {
	var goods = data; //все товары в массиве
	// console.log(goods);
	checkCart(); //проверяю наличие товаров в корзине LocalStorage            
	//console.log(cart);
	showCart(); //вывожу товары на страницу

	function showCart() {
		if ($.isEmptyObject(cart)) {
			//корзина пуста
			var out = 'Корзина пуста. Добавьте товар в корзину <a href="categories.html">Каталог</a>';
			$('#my-cart').html(out);
		}
		else {
			var out = '';
			totalCost = 0;

			for (var key in cart) {

				var cost = cart[key] * goods[key].cost;
				out += '<table>';
				out += '<tr>';
				out += '<td>' + '<button class="delete" data-art="' + key + '" >x</button>' + '</td>';
				out += '<td>' + '<img src="' + goods[key].image + '" width="50">' + '</td>';
				out += '<td>' + '<span class="name">' + goods[key].name + '</span>' + '</td>';
				out += '<td>' + ' ' + goods[key].cost + ' ' + '</td>';
				out += '<td>' + '<button class="minus" data-art="' + key + '">-</button>' + '</td>';
				out += '<td>' + cart[key] + '</td>';
				out += '<td>' + '<button class="plus" data-art="' + key + '">+</button>' + '</td>';
				out += '<td>' + cost + '</td>';
				out += '</tr>';
				out += '</table>';

				totalCost += cost;
			}

			$('#my-cart').html(out);
			$('#total-cost').html(`Количество ${totalCount} на сумму  ${totalCost}`);
			$('#checkout_items').html(totalCount);

			$('.plus').on('click', plusGoods);
			$('.minus').on('click', minusGoods);
			$('.delete').on('click', deleteGoods);
		}
	}

	function plusGoods() {
		var articul = $(this).attr('data-art');
		cart[articul]++;
		saveCartToLS(); //сохраняю корзину в localStorage
		showCart();
		plusCount();

	}

	function minusGoods() {

		var articul = $(this).attr('data-art');
		if (cart[articul] > 1) {
			cart[articul]--;
		}
		else {
			delete cart[articul];
		}
		saveCartToLS(); //сохраняю корзину в localStorage
		showCart();
		minusCount();
	}

	function deleteGoods() {
		var articul = $(this).attr('data-art');
		delete cart[articul];
		saveCartToLS(); //сохраняю корзину в localStorage
		showCart();
		deleteGoodsFromCount();
	}



});

function checkCart() {
	//проверяю наличие корзины в localStorage;
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

function saveCartToLS() {
	localStorage.setItem('cart', JSON.stringify(cart));
}


function minusCount() {
	totalCount--;
	localStorage.setItem('totalCount', totalCount);
	showCount();

	if (totalCount > 0) {
		$('#total-cost').html(`Количество ${totalCount} на сумму  ${totalCost}`);

	}
	else {
		$('#total-cost').html('');
	}
}

function plusCount() {
	totalCount++;
	localStorage.setItem('totalCount', totalCount);
	showCount();
	showCountAndPrice();
}

function deleteGoodsFromCount() {
	totalCount--;
	localStorage.setItem('totalCount', totalCount);
	showCount();
	showCountAndPrice();
}


function showCountAndPrice() {
	$('#total-cost').html(`Количество ${totalCount} на сумму  ${totalCost}`);
}
