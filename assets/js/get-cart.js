jQuery( function( $ ) {
    $('body').on('added_to_cart', function() {
        var data = {
            action: 'woocommerce_piwik_get_cart'
        };

        $.post(wc_add_to_cart_params.ajax_url, data, function(cartItems) {
            var arrayLength = cartItems.length, revenue = 0;
            for (var i = 0; i < arrayLength; i++) {
                _paq.push(['addEcommerceItem',
                    cartItems[i].sku,
                    cartItems[i].title,
                    JSON.parse(cartItems[i].categories),
                    cartItems[i].price,
                    cartItems[i].quantity
                ]);

                revenue += cartItems[i].price * cartItems[i].quantity;
            }

            _paq.push(['trackEcommerceCartUpdate', revenue]);
        });
    });
});