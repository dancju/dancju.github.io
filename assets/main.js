window.onload = () => {
  document.querySelectorAll('a[href^="http"]').forEach(e => e.setAttribute('target', '_blank'));

  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      processEscapes: true
    }
  });

  (() => {
    const content = document.getElementById('content');
    const toc = document.querySelector('#toc > ul');
    if (!content || !toc) return;
    let ul;
    content.childNodes.forEach(e => {
      if (e.nodeName === 'H1') {
        const a = document.createElement("a");
        a.setAttribute('class', 'nav-link');
        a.setAttribute('href', '#' + e.id);
        a.textContent = e.textContent;
        ul = document.createElement('ul');
        ul.setAttribute('class', 'nav flex-column');
        const li = document.createElement('li');
        li.setAttribute('class', 'nav-item');
        li.appendChild(a);
        li.appendChild(ul);
        toc.appendChild(li);
      } else if (e.nodeName == 'H2') {
        const a = document.createElement("a");
        a.setAttribute('class', 'nav-link');
        a.setAttribute('href', '#' + e.id);
        a.textContent = e.textContent;
        const li = document.createElement('li');
        li.setAttribute('class', 'nav-item');
        li.appendChild(a);
        ul.appendChild(li);
      }
    });
    new bootstrap.ScrollSpy(document.body, { target: '#toc' });
  })();
};
