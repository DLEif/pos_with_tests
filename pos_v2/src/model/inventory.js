function InventoryText(cartItems) {
  this.cartItems = cartItems;
}

InventoryText.getSummaryText = function(sumtotal) {
  var summaryText = '';
  summaryText = '总计：' + sumtotal.toFixed(2) + '(元)\n';
  return summaryText;
};

InventoryText.getText = function(cartItems){
  var inventoryText = '***<没钱赚商店>购物清单***\n';
  var promotionText = '';
  var promotions = loadPromotions();
  var sumtotal = 0;
  var saveMoney = 0;
  var itemsText= '';
  promotionText = Promotion.getPromotionText(cartItems);
  var currTime = moment().format('YYYY年MM月DD日 HH:mm:ss');

  _.forEach(cartItems, function(cartItem) {
    var item = cartItem.item;
    var summaryText = 0;
    var count = cartItem.count;
    var promotionItem = _.find(promotions[0].barcodes, function(barcode) {
      return barcode === item.barcode;
    });
    // var promotionItem = Promotion.findPromotionItem(cartItems[i].item.barcode,promotions[0]);
    if( promotionItem) {
      count = cartItem.count - Math.floor(cartItem.count / 3);
    }
    saveMoney += cartItem.item.price * Math.floor(cartItem.count / 3);
    subtotal = (cartItem.item.price) * count;
    sumtotal += subtotal;
    itemsText += CartItem.getItemsText(cartItems, subtotal, i);
    summaryText = InventoryText.getSummaryText(sumtotal);
  });


  inventoryText += '打印时间：' + currTime +'\n' + '----------------------\n'+
  itemsText +
  '----------------------\n' +
  '挥泪赠送商品：\n' +
  promotionText +
  '----------------------\n' +
  summaryText +
  '节省：' + saveMoney.toFixed(2) + '(元)\n'+
  '**********************';

  return inventoryText;
};
