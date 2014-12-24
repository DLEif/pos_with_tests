function CartItem(item, count) {
  this.item = item;
  this.count = count || 0;
}


CartItem.getCartItems = function (tags) {
  var cartItems = [];
  var allItems = loadAllItems();

  for(var i = 0; i < tags.length; i++) {

    var splitArray = tags[i].split('-');
    barcode = splitArray[0];
    count = 1;

    if(splitArray[1]) {
      count = parseFloat(splitArray[1]);
    }

    var cartItem = CartItem.findCartItem(barcode, cartItems);

    if(cartItem) {
      cartItem.count += count;
    } else {
      var newitem = CartItem.findItem(allItems,barcode);
      //var cartItem = new CartItem(newitem, count);
      cartItems.push(cartItem);
    }
  }
  return cartItems;
};
CartItem.findCartItem = function (barcode, cartItems) {
  var cartItem;
  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === barcode) {
      cartItem = cartItems[i];
    }
  }
  return cartItem;
};
CartItem.findItem = function(allItems,barcode) {
  var newItem;
  _.forEach(allItems, function(allItem) {
    if(allItem.barcode === barcode) {
      newItem = allItem;
    }
  });
  return newItem;
};

CartItem.getItemsText = function(cartItems, subtotal, i) {
  var itemsText = '';
  itemsText += '名称：' + cartItems[i].item.name +
  '，数量：' + cartItems[i].count + cartItems[i].item.unit +
  '，单价：' + cartItems[i].item.price.toFixed(2) +'(元)' +
  '，小计：' + subtotal.toFixed(2) + '(元)\n';
  return itemsText;
};
