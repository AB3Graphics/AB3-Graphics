// orderform-ab3.js
$(document).ready(function () {
  $('#name').focus();
  var emailPattern = /^[\w.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  function showError(spanId, msg) {
    $('#' + spanId).text(msg);
  }

  function clearError(spanId) {
    $('#' + spanId).text('');
  }

  function isBlank(value) {
    return $.trim(value) === '';
  }

  function validateName() {
    var val = $('#name').val();
    if (isBlank(val)) {
      showError('nameErr', 'Name is required.');
      return false;
    }
    clearError('nameErr');
    return true;
  }

  function validateAddress() {
    var val = $('#address').val();
    if (isBlank(val)) {
      showError('addressErr', 'Billing address is required.');
      return false;
    }
    clearError('addressErr');
    return true;
  }

  function validateCity() {
    var val = $('#city').val();
    if (isBlank(val)) {
      showError('cityErr', 'City is required.');
      return false;
    }
    clearError('cityErr');
    return true;
  }

  function validateZip() {
    var val = $('#zip').val();
    if (!/^\d{5}$/.test(val)) {
      showError('zipErr', 'Zip must be 5 digits.');
      return false;
    }
    clearError('zipErr');
    return true;
  }

  function validateEmail() {
    var val = $('#email').val();
    if (isBlank(val)) {
      showError('emailErr', 'Email is required.');
      return false;
    }
    if (!emailPattern.test(val)) {
      showError('emailErr', 'Enter a valid email address.');
      return false;
    }
    clearError('emailErr');
    return true;
  }

  function validateEmailConfirm() {
    var email1 = $('#email').val();
    var email2 = $('#email2').val();

    if (isBlank(email2)) {
      showError('email2Err', 'Please confirm your email.');
      return false;
    }
    if (!emailPattern.test(email2)) {
      showError('email2Err', 'Enter a valid email address.');
      return false;
    }
    if (email1 !== email2) {
      showError('email2Err', 'Email addresses must match.');
      return false;
    }
    clearError('email2Err');
    return true;
  }

  function validateShipAddress() {
    var val = $('#shipaddr').val();
    if (isBlank(val)) {
      showError('shipaddrErr', 'Shipping address is required.');
      return false;
    }
    clearError('shipaddrErr');
    return true;
  }

  function validateShipCity() {
    var val = $('#shipcity').val();
    if (isBlank(val)) {
      showError('shipcityErr', 'Shipping city is required.');
      return false;
    }
    clearError('shipcityErr');
    return true;
  }

  function validateShipZip() {
    var val = $('#shipzip').val();
    if (!/^\d{5}$/.test(val)) {
      showError('shipzipErr', 'Zip must be 5 digits.');
      return false;
    }
    clearError('shipzipErr');
    return true;
  }

  function validatePersonalInfo() {
    var ok = true;

    if (!validateName()) ok = false;
    if (!validateAddress()) ok = false;
    if (!validateCity()) ok = false;
    if (!validateZip()) ok = false;
    if (!validateEmail()) ok = false;
    if (!validateEmailConfirm()) ok = false;

    return ok;
  }

  function validateShippingInfo() {
    var ok = true;

    if (!validateShipAddress()) ok = false;
    if (!validateShipCity()) ok = false;
    if (!validateShipZip()) ok = false;

    return ok;
  }

  $('#copy').change(function () {
    if ($(this).prop('checked')) {
      $('#shipaddr').val($('#address').val());
      $('#shipcity').val($('#city').val());
      $('#shipzip').val($('#zip').val());
      var billState = $('#state').val();
      $('#shipstate').val(billState);
    }
    calculateTotals();
  });

  $('#shipstate').change(function () {
    calculateTotals();
  });

  function calculateTotals() {
    var orderTotal = 0;

    $('.qty').each(function () {
      var idx = $(this).attr('id');

      var qty = parseInt($(this).val(), 10);
      if (isNaN(qty) || qty < 0) {
        qty = 0;
      }

      $(this).val(qty);

      var priceText = $('#price' + idx).text();
      var price = parseFloat(priceText);

      if (isNaN(price)) {
        price = 0;
      }

      var lineTotal = price * qty;
      $('#total' + idx).text(lineTotal ? lineTotal.toFixed(2) : '');

      orderTotal += lineTotal;
    });

    $('#subt').text(orderTotal.toFixed(2));

    var shipState = $('#shipstate').val();
    var tax = 0;
    if (shipState === 'TX') {
      tax = orderTotal * 0.08;
    }
    $('#tax').text(tax.toFixed(2));
    orderTotal += tax;
    var shipCost = 0;
    if (shipState === 'TX') {
      shipCost = 5.0;
    } else if (shipState === 'CA' || shipState === 'NY') {
      shipCost = 20.0;
    } else {
      shipCost = 10.0;
    }
    $('#ship').text(shipCost.toFixed(2));
    orderTotal += shipCost;
    $('#gTotal').text(orderTotal.toFixed(2));
  }

  $('.qty').blur(function () {
    calculateTotals();
  });


  $('#name').blur(validateName);
  $('#address').blur(validateAddress);
  $('#city').blur(validateCity);
  $('#zip').blur(validateZip);
  $('#email').blur(validateEmail);
  $('#email2').blur(validateEmailConfirm);

  $('#shipaddr').blur(validateShipAddress);
  $('#shipcity').blur(validateShipCity);
  $('#shipzip').blur(validateShipZip);
  $('#order').submit(function (e) {
    var formOk = true;

    if (!validatePersonalInfo()) formOk = false;
    if (!validateShippingInfo()) formOk = false;
    calculateTotals();
    if (!formOk) {
      e.preventDefault();
      alert('Please fix the errors before submitting.');
    }
  });
});
