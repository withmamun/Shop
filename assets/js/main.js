(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {


        // Product fav list ------------------------
        $( ".product__fav__red" ).on( "click", function() {
            $( this ).toggleClass( "active" );
          });



    }); //---document-ready-----

}(jQuery));




          // Add to cart product -------------------

          var shoppingCart = (function() {
            cart = [];
            function Item(img, name, price, count) {
              this.img = img;
              this.name = name;
              this.price = price;
              this.count = count;
            }
            var y = JSON.parse(localStorage.getItem('shoppingCart'));
              for(var item in y){
                  console.log(y[item].name);
                  if(y[item].name){
                      $('.'+y[item].name).text('Added');
                      $('.'+y[item].name).prop('disabled', true);
                  }
              }
            // Save cart
            function saveCart() {
              localStorage.setItem('shoppingCart', JSON.stringify(cart));
                var x = JSON.parse(localStorage.getItem('shoppingCart'));
                  for(var item in x){
                      $('.'+x[item].name).text('Added');
                      $('.'+x[item].name).prop('disabled', true);
                }
              }
            
            // Load cart
            function loadCart() {
              cart = JSON.parse(localStorage.getItem('shoppingCart'));
            }
            if (localStorage.getItem("shoppingCart") != null) {
              loadCart();
            }
            
            var obj = {};
            
            // Add to cart
            obj.addItemToCart = function(img, name, price, count) {
              for(var item in cart) {
                  // console.log(cart[item].name);
                if(cart[item].name === name) {
                  //   alert('ha');
                  cart[item].count ++;
                  $('.'+cart[item].name).text('Added');
                  $('.'+cart[item].name).prop('disabled', true);
                  saveCart();
                  return;
                }
              }
              var item = new Item(img, name, price, count);
              cart.push(item);
              saveCart();
            }
            // Set count from item
            obj.setCountForItem = function(img, name, count) {
              for(var i in cart) {
                if (cart[i].name === name) {
                  cart[i].count = count;
                  break;
                }
              }
            };
            
            // Remove item from cart
            obj.removeItemFromCart = function(name) {
                for(var item in cart) {
                  if(cart[item].name === name) {
                    cart[item].count --;
                    if(cart[item].count === 0) {
                      cart.splice(item, 1);
                    }
                    break;
                  }
              }
              saveCart();
            }
          
            // Remove all items from cart
            obj.removeItemFromCartAll = function(name) {
              for(var item in cart) {
                if(cart[item].name === name) {
                  $('.'+cart[item].name).text('Add To Cart'); 
                  $('.'+cart[item].name).prop('disabled', false); 
                  cart.splice(item, 1);
                  break;
                }
              }
              saveCart();
            }
          
            // Clear cart
            obj.clearCart = function() {
              cart = [];
              // $('.add-to-cart').text('Add To Cart'); 
              saveCart();
            }
          
            // Count cart 
            obj.totalCount = function() {
              var totalCount = 0;
              for(var item in cart) {
                totalCount += cart[item].count;
              }
              return totalCount;
            }
          
            // Total cart
            obj.totalCart = function() {
              var totalCart = 0;
              for(var item in cart) {
                totalCart += cart[item].price * cart[item].count;
              }
              return Number(totalCart.toFixed(2));
            }
          
            // List cart
            obj.listCart = function() {
              var cartCopy = [];
              for(i in cart) {
                item = cart[i];
                itemCopy = {};
                for(p in item) {
                  itemCopy[p] = item[p];
          
                }
                itemCopy.total = Number(item.price * item.count).toFixed(2);
                cartCopy.push(itemCopy)
              }
              return cartCopy;
            }
            return obj;
          })();
          
          $('.add-to-cart').click(function(event) {
            event.preventDefault();
            var img = $(this).data('img');
            var name = $(this).data('name');
            var price = Number($(this).data('price'));
            shoppingCart.addItemToCart(img, name, price, 1);
            displayCart();
          });
          
          // Clear items
          $('.clear-cart').click(function() {
            shoppingCart.clearCart();
            displayCart();
            $('.add-to-cart').text('Add To Cart');
            $('.add-to-cart').prop('disabled', false);
          });
          
          
          function displayCart() {
            var cartArray = shoppingCart.listCart();
            var output = "";
            for(var i in cartArray) {
              output += "<tr>"
                + "<td>" + "<img style='width: 50px; height: 50px;' src="+ cartArray[i].img +"></td>" 
                + "<td>" + cartArray[i].name + "</td>" 
                + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
                + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
                + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
                + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
                + " = " 
                + "<td>" + cartArray[i].total + "</td>" 
                +  "</tr>";
            }
            $('.show-cart').html(output);
            $('.total-cart').html(shoppingCart.totalCart());
            $('.total-count').html(shoppingCart.totalCount());
          }
          
          // Delete item button
          
          $('.show-cart').on("click", ".delete-item", function(event) {
            // var img = $(this).data('img')
            var name = $(this).data('name')
            shoppingCart.removeItemFromCartAll(name);
            displayCart();
          })
          
          
          // -1
          $('.show-cart').on("click", ".minus-item", function(event) {
            // var img = $(this).data('img')
            var name = $(this).data('name')
            shoppingCart.removeItemFromCart(name);
            displayCart();
          })
          // +1
          $('.show-cart').on("click", ".plus-item", function(event) {
            var img = $(this).data('img')
            var name = $(this).data('name')
            shoppingCart.addItemToCart(img, name);
            displayCart();
          })
          
          // Item count input
          $('.show-cart').on("change", ".item-count", function(event) {
             var img = $(this).data('img');
             var name = $(this).data('name');
             var count = Number($(this).val());
            shoppingCart.setCountForItem(img, name, count);
            displayCart();
          });
          
          displayCart();


