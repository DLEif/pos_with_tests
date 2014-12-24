function Promotion(type, barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}

Promotion.getPromotionText = function(cartItems) {
  var promotionText = '';
  var promotions = loadPromotions();
  _.forEach(cartItems, function(cartItem) {
    var item = cartItem.item;
    var promotionItem = _.find(promotions[0].barcodes, function(barcode) {
      return barcode === item.barcode;
    });
    // var promotionItem = Promotion.findPromotionItem(cartItems[i].item.barcode,promotions[0]);
    if(promotionItem) {
      promotionText += '名称：' + cartItem.item.name +
      '，数量：' + Math.floor(cartItem.count / 3) +
      cartItem.item.unit + '\n';
    }
  });

  return promotionText;
};

// Promotion.findPromotionItem = function(barcode,promotions) {
//   var promotionitem;
//   for(var i = 0;i < promotions.barcodes.length;i++) {
//     if(promotions.barcodes[i] === barcode) {
//       promotionitem = promotions.barcodes[i];
//     }
//   }
//   return promotionitem;
// }
