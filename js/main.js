$('main').ready(function() {
  var aside, main, ul;
  main = $($('main').children()[1]);
  aside = $('aside').children().children();
  ul = void 0;
  $.each(main.children(), function() {
    var a, li;
    if (this.nodeName === 'H2') {
      a = $('<a>', {
        href: '#' + this.id
      }).text(this.innerHTML);
      ul = $('<ul>').addClass('nav');
      li = $('<li>').append(a).append(ul);
      return aside.append(li);
    } else if (this.nodeName === 'H3') {
      a = $('<a>', {
        href: '#' + this.id
      }).text(this.innerHTML);
      li = $('<li>').append(a);
      return ul.append(li);
    }
  });
  return $('#contents').affix({
    offset: {
      top: 51,
      bottom: function() {
        return this.bottom = $('footer').outerHeight(true) + $('#comments').outerHeight(true) + 41 + 155;
      }
    }
  });
});
