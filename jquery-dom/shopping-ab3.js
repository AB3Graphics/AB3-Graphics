// shopping.js
// Traversing the DOM – Shopping Cart + Star Ratings

"use strict";

$(function () {

  // -------------------------
  // 1. Shopping cart counter & delete button HTML
  // -------------------------
  let itemCount = 0; // number of items currently in the cart
  const delButtonHTML = " <span class='del'>Remove</span>";

  // -------------------------
  // 2. Add to Cart button click
  //    (.add is on each product's "Add to Cart" button)
  // -------------------------
  $(".add").on("click", function () {

    // increment cart count
    itemCount++;

    // if cart has at least one item, hide the "empty" message
    if (itemCount > 0) {
      $("#empty").hide();
    }

    // get data from clicked button
    const itemName = $(this).attr("name"); // flower name
    const itemID = $(this).attr("id");     // unique id of this product/button

    // build <li> HTML for the cartItem
    // li has class 'cartItem' and name attribute equal to the itemID
    const cartLink =
      "<li class='cartItem' name='" +
      itemID +
      "'>" +
      itemName +
      delButtonHTML +
      "</li>";

    // append to the end of the #cart ul
    $("#cart").append(cartLink);

    // hide this "Add to Cart" button so the same item can't be added twice
    $("#" + itemID).hide();
  });

  // -------------------------
  // 3. Delegate click event for Remove buttons in the cart
  //    (these .del spans are added dynamically, so we use delegation)
  // -------------------------
  $("#cart").on("click", ".del", function () {

    // find the parent <li> for this Remove button
    const $cartItem = $(this).closest("li.cartItem");

    // read the name attribute to know which product/button this corresponds to
    const itemID = $cartItem.attr("name");

    // remove the cart item from the DOM
    $cartItem.remove();

    // decrement cart count
    if (itemCount > 0) {
      itemCount--;
    }

    // if the cart is now empty, show the "Your shopping cart is empty" li again
    if (itemCount === 0) {
      $("#empty").show();
    }

    // show the corresponding "Add to Cart" button again for this item
    $("#" + itemID).show();
  });

  // -------------------------
  // 4. Star rating click (1–5 stars)
  //    Targets any star image inside a span.rating
  // -------------------------
  $(".rating img").on("click", function () {
    const $clickedStar = $(this);

    // 1) Turn ALL sibling stars off
    $clickedStar
      .siblings("img")
      .attr("src", "staroff.gif");

    // 2) Turn the clicked star ON
    $clickedStar.attr("src", "staron.gif");

    // 3) Turn all PREVIOUS stars ON as well
    $clickedStar
      .prevAll("img")
      .attr("src", "staron.gif");

    // (the "next" stars were already turned off in step 1)
  });

});
