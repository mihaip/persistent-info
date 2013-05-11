(function() {

function renderBlogroll(data) {
  renderReaderItems(data, document.getElementById('blogroll'));
}

function renderReaderItems(data, node) {
  var html = [];

  for (var i = 0, item; item = data.items[i]; i++) {
    if (!item.alternate || !item.alternate.href) continue;

    html.push(
        '<li>',
        '<a href="', item.alternate.href, '">', item.title, '</a>');

    if (item.origin && item.origin.title) {
      html.push('<div class="s"> from ');

      if (item.origin.htmlUrl) {
        html.push('<a href="', item.origin.htmlUrl, '">');
      }

      html.push(item.origin.title);

      if (item.origin.htmlUrl) {
        html.push('</a>');
      }

      html.push('</div>');
    }

    html.push('</li>');
  }

  node.innerHTML = html.join('');
}

// With the above as callbacks, asynchronously load and display the data
window['renderBlogroll'] = renderBlogroll;
addScript('http://www.google.com/reader/public/javascript-sub/' +
    'user/00302724078372822531/bundle/Blogroll?' +
    'callback=renderBlogroll');

})();
