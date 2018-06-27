$(document).ready(function() {
    //Get request for all menu items and arranges them by category
    $.get('https://galvanize-eats-api.herokuapp.com/menu').then(function(data) {
        var length = data.menu.length;
        console.log(data);
        for(var i=0; i<length; i++) {
            if(data.menu[i].type === "burger") {
                if(i==2) {
                    $('.burger').after('<div class="chosen fullItem"><p class="item">'+data.menu[i].name+' </p><p class="price">$'+data.menu[i].price+'</p></div>');
                }
                else {
                    $('.burger').after('<div class="fullItem"><p class="item">'+data.menu[i].name+' </p><p class="price">$'+data.menu[i].price+'</p></div>');
                }
            }
            else if(data.menu[i].type === "pizza") {
                if(i==2) {
                    $('.pizza').after('<div class="chosen fullItem"><p class="item">'+data.menu[i].name+' </p><p class="price">$'+data.menu[i].price+'</p></div>');
                }
                else {
                    $('.pizza').after('<div class="fullItem"><p class="item">'+data.menu[i].name+' </p><p class="price">$'+data.menu[i].price+'</p></div>');
                }
            }
        }
    });

    //This handler changes which menu is highlighted when you click one
    $(document).on('click','.fullItem',function() {
        $('.fullItem').removeClass('chosen');
        $('.fullItem').css('background-color', 'white');
        $(this).css('background-color', 'hsl(195, 48%, 54%)');
        $(this).addClass("chosen");
    });

    //This handler adds items from menu to your list and updates subtotal, tax and total
    $('.addItem').click(function() {
        var quantity = $('#quantity').val();
        if(quantity > 0 && quantity <= 99) {
            for(var i=0; i<quantity; i++) {
                $('.totals').append('<div class="totalOrderedItem"><p class="orderedItem">'+$('.chosen').find('.item').text()+'</p><p class="priceAdded">'+$('.chosen').find('.price').text()+'</p></div>');
                var p = $('.chosen').text().indexOf("$");
                var num = $('.chosen').text().substring(p + 1);
                var temp = $('.subNum').text().indexOf("$");
                var currentSub = $('.subNum').text().substring(temp+1);
                var subtotal = (Number(currentSub)+Number(num));
                $('.subNum').text('$'+Number(subtotal).toFixed(2));
                var tax = (0.083*subtotal);
                $('.taxNum').text('$'+Number(tax).toFixed(2));
                var total = (Number(subtotal) + Number(tax));
                $('.totNum').text('$'+Number(total).toFixed(2));
            }
        }
    })

    //This handler sends a post request with form data for delivery
    $('.deliver').click(function(event) {
        event.preventDefault();
        var itemsOrdered = [];
        $('.totalOrderedItem').each(function( index ) {
            itemsOrdered[index] = $(this).find('.orderedItem').text() + ' - ' + $(this).find('.priceAdded').text();
        });
        $.post("https://galvanize-eats-api.herokuapp.com/orders", {
            items: itemsOrdered,
            name: $('#name').val(),
            number: $("#number").val(),
            address: $('#address').val()
        }).done(function(response) {
            console.log(response);
        }).fail(function(data, error) {
            console.log(data);
        });
    });
});
