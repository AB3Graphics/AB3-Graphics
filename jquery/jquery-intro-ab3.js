var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var tips = [
  "<p>Winter interest is real: pair Camellias with Hellebores for cold-season color.</p>",
  "<p>Spring renewal:<ul><li>Plant tomatoes by March 15.</li><li>Fertilize after warm-season grasses are actively growing.</li><li>Release beneficial nematodes for pest control.</li></ul>",
  "<p><strong>Summer care:</strong> Plant peppers, eggplant and tender herbs; add color with geraniums and snapdragons.</p>",
  "<p>Fall is prime planting in North Texas. Add petunias, dianthus, ornamental kale and mums; prep for winter pansies and violas.</p>"
];

var specials = [
  "<p>Don't forget our feathered friends!</p><p>All bird feeders and birdseed are 50% off this January.</p>",
  "<p>Roses for your sweetheart!</p><p>All roses are $24.99 this February.</p>",
  "<p>Add some color to your garden!</p><p>This March all petunias are $10.99 for a flat of 16.</p>",
  "<p>Time to fertilize!</p><p>All fertilizers 20% off.</p>",
  "<p>Geraniums: 6 inch pot is only $6.99 all May!</p>",
  "<p>These can take the heat!</p><p>Zinnias: $1.00 each for a 4 inch pot.</p>",
  "<p><strong>BOGO</strong></p><p>All containers, buy one, get one of equal or lesser value 1/2 price</p>",
  "<p>Cacti and succulents, 25% off</p>",
  "<p>Get ready for fall!<p><p>Mums: 6 inch pot $5.99</p>",
  "<p><strong>Jack-O-Lanterns</strong></p><p>Pumpkins: <br>large $8.99<br>small $5.99<br>Decorative: $7.99-11.99<br>Gourds: $6.99</p>",
  "<p>Trees and shrubs: 1/2 price - in stock only.</p>",
  "<p>Christmas trees! Sizes from 3' to 15' while they last.</p>"
];

$(document).ready(function () {
  var today = new Date();
  var monthNum = today.getMonth();
  var monthName = months[monthNum];
  var year = today.getFullYear();

  if (monthNum === 11) {
    $("#slogan").after("<h3>Happy Holidays!</h3>");
  }

  $("#month").text("Tips for " + monthName);

  $("#copy").append(" " + year);

  $("#specials").html("<h3>Specials</h3>" + specials[monthNum]);

  var season, bgImage, color, seasonIndex;
  switch (true) {
    case (monthNum === 11 || monthNum === 0 || monthNum === 1):
      season = "Winter";
      bgImage = "winterbg-ab3.jpg";
      color = "#00f";
      seasonIndex = 0;
      break;
    case (monthNum >= 2 && monthNum <= 4):
      season = "Spring";
      bgImage = "springbg-ab3.jpg";
      color = "#d7d";
      seasonIndex = 1;
      break;
    case (monthNum >= 5 && monthNum <= 7):
      season = "Summer";
      bgImage = "summerbg-ab3.jpg";
      color = "#006400";
      seasonIndex = 2;
      break;
    default:
      season = "Fall";
      bgImage = "fallbg-ab3.jpg";
      color = "#930";
      seasonIndex = 3;
  }

  $("body").css("background-image", "url(" + bgImage + ")");

  $("#seasontips").html(tips[seasonIndex]);

  $("strong, h1, h2, h3").css("color", color);

  $("#specials").addClass(season);
});