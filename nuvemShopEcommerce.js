'use strict';
// Actual code

//view_item
//enhanced commerce + remarketing
if (LS.template == 'product') {
  console.log('view_item is under work');
  function g_gtagEvent(g_event) {
    gtag('event', g_event, {
      currency: LS.currency.code,
      value: LS.variants[0].price_number,
      items: [
        {
          id: LS.variants[0].id,
          item_id: LS.variants[0].id,
          item_name: LS.product.name,
          currency: LS.currency.code,
          price: LS.variants[0].price_number,
          google_business_vertical: 'retail',
          quantity: document.querySelector('').value, // quantity of products
        },
      ],
    });
  }
  g_gtagEvent('view_item');

  //add_to_cart
  //enhanced commerce + remarketing
  document.addEventListener('click', function (e) {
    for (i = 0; i < e.path.length; i++) {
      if (e.path[i].value) {
        if (e.path[i].value == 'Comprar') {
          console.log('add_to_cart has been clicked');
          g_gtagEvent('add_to_cart');
        }
      }
    }
  });
}

//view_item_list
//remarketing
if (LS.template == 'category') {
  console.log('view_item_list is under work');
  if (fb_params['content_ids']) {
    var g_view_item_list = [];
    var g_params = fb_params['content_ids'];

    for (i = 0; i < g_params.length; i++) {
      g_view_item_list.push({
        id: g_params[i],
        google_business_vertical: 'retail',
      });
    }

    gtag('event', 'view_item_list', {
      items: g_view_item_list,
    });
  }
}

//begin_checkout
//enhanced commerce
if (window.location.href.includes('/checkout/')) {
  //g_checkout_items
  var g_checkout_items = [];
  for (i = 0; i < LS.cart.items.length; i++) {
    g_checkout_items.push({
      id: LS.cart.items[i].id,
      item_id: LS.cart.items[i].id,
      item_name: LS.cart.items[i].name,
      currency: LS.currency,
      price: Number((LS.cart.items[i].unit_price / 100).toFixed(2)),
      quantity: LS.cart.items[i].quantity,
      google_business_vertical: 'retail',
    });
  }
  if (window.location.href.includes('/checkout/v3/start/')) {
    console.log('begin_checkout has been started');
    gtag('event', 'begin_checkout', {
      currency: LS.currency,
      value: Number((LS.cart.subtotal / 100).toFixed(2)),
      items: g_checkout_items,
    });
  }

  //add_payment_info
  if (window.location.href.includes('/checkout/v3/next/')) {
    console.log('add_payment_info has been started');
    gtag('event', 'add_payment_info', {
      currency: LS.currency,
      value: Number((LS.cart.subtotal / 100).toFixed(2)),
      items: g_checkout_items,
    });
  }
}

//purchase
//enhanced commerce + remarketing
if (window.location.href.includes('/checkout/')) {
  var g_checkout_items = [];
  for (i = 0; i < LS.cart.items.length; i++) {
    g_checkout_items.push({
      id: LS.cart.items[i].id,
      item_id: LS.cart.items[i].id,
      item_name: LS.cart.items[i].name,
      currency: LS.currency,
      price: Number((LS.cart.items[i].unit_price / 100).toFixed(2)),
      quantity: LS.cart.items[i].quantity,
      google_business_vertical: 'retail',
    });
  }
  if (window.location.href.includes('/checkout/v3/success')) {
    console.log('Compra realizada');
    gtag('event', 'purchase', {
      coupon: LS.order.coupon,
      currency: LS.currency,
      items: g_checkout_items,
      transaction_id: LS.order.id,
      value: Number(LS.order.total / 100).toFixed(2),
    });
  }
}

/* beta code
var getURL = window.location.href;

// view_item
if (getURL.includes('/produtos')) {
  console.log('View item');
  gtag('event', 'view_item', {
    currency: LS.currency.code,
    items: [
      {
        item_id: LS.product.id,
        item_name: LS.product.name,
        price: LS.variants[0].price_number,
        quantity: 1,
      },
    ],
    value: LS.variants[0].price_number,
  });
}

// add_to_cart

if (getURL.includes('/checkout')) {
  // add_to_cart e begin_checkout
  var googleItems = [];
  LS.cart.items.forEach(function (el) {
    var addToCartValue = 0;

    var googleItemName = el.name;
    var googleItemId = el.id;
    var googleItemValue = el.unit_price / 100;
    var googleItemQty = el.quantity;

    addToCartValue += googleItemValue;

    googleItems.push({
      item_name: googleItemName,
      item_id: googleItemId,
      price: googleItemValue,
      quantity: googleItemQty,
    });
  });
  gtag('event', 'add_to_cart', {
    currency: LS.currency,
    items: googleItems,
    value: addToCartValue,
  });

  gtag('event', 'begin_checkout', {
    currency: LS.currency,
    items: googleItems,
    value: addToCartValue,
  });
}
// purchase - disparar na página de checkout, adicionar junto à parte de finalização de compra
if (getURL.includes('/checkout/v3/success')) {
  console.log('Compra realizada');
  gtag('event', 'purchase', {
    affiliation: LS.store.id || LS.store.url, // não sei qual decidir
    coupon: LS.order.coupon,
    currency: LS.currency,
    items: googleItems,
    transaction_id: LS.order.id,
    value: LS.order.total.toFixed(2) / 100,
  });
}
*/
