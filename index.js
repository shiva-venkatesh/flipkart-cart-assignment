document.addEventListener("DOMContentLoaded", function() {
  (function () {
    function generateRow(product) {
      debugger
      return(
        `<div class="listing-row">
            <div class="listing-image-block">
              <img src="${product.product_meta.img}" class="listing-img" alt="${product.product_meta.title}" />
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