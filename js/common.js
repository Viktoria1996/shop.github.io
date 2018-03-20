var totalCount = localStorage.getItem('totalCount');

$('document').ready(function() {
	showCount();
});

function showCount() {
	$('#checkout_items').html(localStorage.getItem('totalCount'));
}
