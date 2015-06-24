---
---

$ ->
  renderMathInElement document.body,
    {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ]
    }

$('main').ready ->
  main = $($('main').children()[1])
  aside = $('aside').children().children()
  ul = undefined
  $.each main.children(), ->
    if this.nodeName=='H2'
      a = $('<a>', { href: '#'+this.id }).text(this.innerHTML)
      ul = $('<ul>').addClass('nav')
      li = $('<li>').append(a).append(ul)
      aside.append li
    else if this.nodeName=='H3'
      a = $('<a>', { href: '#'+this.id }).text(this.innerHTML)
      li = $('<li>').append(a)
      ul.append li

$('aside>div').affix { offset: {
  top: 51,
  bottom: ->
    (this.bottom = $('footer').outerHeight(true))
  }}
