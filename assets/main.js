$('main').ready(() => {
  $('a[href^="http"]').attr('target', '_blank');

  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      processEscapes: true
    }
  });

  const main = $('#main > .card > .card-body');
  const aside = $('aside > ul');
  let ul;
  main.children().each((_, tag) => {
    if (tag.nodeName === 'H1') {
      const a = $('<a>', { class: 'nav-link', href: '#' + tag.id }).text(tag.innerHTML);
      ul = $('<ul>').addClass('nav flex-column');
      const li = $('<li>', { class: 'nav-item' }).append(a).append(ul);
      aside.append(li);
    } else if (tag.nodeName === 'H2') {
      const a = $('<a>', { class: 'nav-link', href: '#' + tag.id }).text(tag.innerHTML);
      const li = $('<li>', { class: 'nav-item' }).append(a);
      ul.append(li);
    }
  });
});
