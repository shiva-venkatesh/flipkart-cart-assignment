document.addEventListener("DOMContentLoaded", function() {
  window.cartItems = [];
  window.amountPayable = 0;
  (function () {
    window.addToCart = function(productID) {
      console.log('clicked add : ' + productID);
      var productToBeAdded = allProducts.find((product) => product.product_id === productID);
      if(cartItems.find((product) => product.product_id === productID)) {
        window.amountPayable = window.amountPayable + productToBeAdded.pricing.mrp;
      } else {
        window.amountPayable = window.amountPayable + productToBeAdded.pricing.mrp + productToBeAdded.pricing.delivery_charge;
      }
      document.getElementById('amount-final').innerHTML = window.amountPayable;
    }
    
    window.removeFromCart = function(productID) {
      var prodID = productID.substring(0, productID.length-3);
      console.log('clicked remove : ' + prodID);
      var productToBeRemoved = allProducts.find((product) => product.product_id === prodID);
      if(cartItems.find((product) => product.product_id === prodID)) {
        window.amountPayable = window.amountPayable - productToBeRemoved.pricing.mrp;
      } else {
        window.amountPayable = window.amountPayable - productToBeRemoved.pricing.mrp - productToBeRemoved.pricing.delivery_charge;
      }
      document.getElementById('amount-final').innerHTML = window.amountPayable;
    }
    
    function generateRow(product) {
      return(
        `<div class="listing-row">
            <div class="listing-image-block">
              <div class="listing-image-container">
                <img src="${product.product_meta.img}" class="listing-img" alt="${product.product_meta.title}" />
              </div>
              <div class="counter-block">
                <div class="button-block">
                  <button class="counterButton" type="button" onclick="window.addToCart(this.id)" id=${product.product_id}>
                    +
                  </button>
                  <button class="counterButton" type="button" onclick="window.removeFromCart(this.id)" id=${product.product_id}11">
                    -
                  </button>
                </div>
                <div class="button-block">
                </div>
              </div>
            </div>
            <div class="listing-title-block">
              <div class="listing-title">
                ${product.product_meta.title}
              </div>
              <div class="listing-price-block">
                <div class="listing-prices">
                  <span class="prices selling-price">
                    ₹${product.pricing.selling_price}
                  </span>
                  <span class="prices mrp">
                    <strike>₹${product.pricing.mrp}</strike>
                  </span>
                </div>
              </div>
            </div>
        </div>`
      )
    }
    
    fetch('https://flipkart-cart-mock.now.sh/')
      .then((response) => response.json())
      .then((data) => {
        console.log('The data fetched from the API is: ' + data);
        console.table(data)
        var listingsContainer = document.getElementById('listings-footer')
        console.log(listingsContainer);
        let allProducts = data;
        var cItems = []
        window.allProducts = allProducts;
        window.amountPayable = 0;
        allProducts.map((product) => {
          cartItem = Object.assign({}, product);
          cartItem.count = 1;
          amountPayable = Number(window.amountPayable) + (Number(cartItem.pricing.selling_price)*Number(cartItem.count)) + Number(cartItem.pricing.delivery_charge);
          console.log('the amount payable is: ' + window.amountPayable) 
          cItems.push(cartItem);
        });
        document.getElementById('amount-final').innerHTML = window.amountPayable;
        window.cartItems = cItems.slice();
        var rowToBeAdded = '';
        allProducts.map((product) => {
          rowToBeAdded = generateRow(product);
          var div = document.createElement('div');
          div.innerHTML = rowToBeAdded;
          listingsContainer.parentNode.insertBefore(div, listingsContainer);
        })
      })
  })();
});