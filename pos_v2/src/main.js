function printInventory(tags) {
  var cartItems = CartItem.getCartItems(tags);
  var inventoryText = InventoryText.getText(cartItems);
  console.log(inventoryText);
}
