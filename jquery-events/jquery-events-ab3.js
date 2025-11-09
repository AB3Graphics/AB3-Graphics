// jQuery Events — AB3 version
$(document).ready(function () {
  // Hide botanic names and image divs immediately on load
  $('.botanic').hide();
  $('.imgdiv').hide();

  // Mouseover / Mouseout: change h1, h2 color and restore
  const baseColor  = 'darkgreen';
  const hoverColor = '#7a1bd1';
  $('h1, h2')
    .on('mouseover', function () { $(this).css('color', hoverColor); })
    .on('mouseout',  function () { $(this).css('color', baseColor); });

  // Click a flower line: show only that botanic name
  $('.flower').on('click', function () {
    $('.botanic').hide();
    $(this).children('.botanic').show(); // spec requires children('.botanic').show()
  });

  // Hover over .pic span: show associated image near cursor
  $('.pic').hover(
    function (evt) {
      const id = '#' + $(this).attr('title'); // e.g., "rose" → "#rose"
      const x  = evt.pageX + 150;             // push right so it doesn't cover text
      const y  = evt.pageY;
      $(id).css({ left: x + 'px', top: y + 'px' }).show();
    },
    function () {
      const id = '#' + $(this).attr('title');
      $(id).hide();
    }
  );

  // Keypress: jump to first flower for that letter (anchors #a..#z)
  $(document).on('keypress', function (evt) {
    const key = String.fromCharCode(evt.which).toLowerCase();
    if (key >= 'a' && key <= 'z') window.location = '#' + key;
  });
});
