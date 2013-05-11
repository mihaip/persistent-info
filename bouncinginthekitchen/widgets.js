(function() {

// Based on http://twitter.com/javascripts/blogger.js
function renderTweets(tweets) {
  var linkifyUrlsRe =
      /((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g;
  var linkifyUrls = function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  };
  var linkifyUsernamesRe = /\B@([_a-z0-9]+)/ig;
  var linkifyUsernames = function(reply) {
    return reply.charAt(0) + '<a href="http://twitter.com/' +
        reply.substring(1) + '">' + reply.substring(1) + '</a>';
  };

  var html = [];

  for (var i = 0, tweet; tweet = tweets[i]; i++) {
    var username = tweet.user.screen_name;
    var status = tweet.text
        .replace(linkifyUrlsRe, linkifyUrls)
        .replace(linkifyUsernamesRe, linkifyUsernames);

    html.push(
        '<li>',
        status,
        ' <a style="font-size:85%" href="http://twitter.com/',
        username,
        '/statuses/', tweet.id, '">',
        getRelativeTime(tweet.created_at),
        '</a></li>');
  }

  document.getElementById('tweets').innerHTML = html.join('');
}

function getRelativeTime(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = Math.floor((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (Math.floor(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (Math.floor(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (Math.floor(delta / 86400)).toString() + ' days ago';
  }
}

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
window['renderTweets'] = renderTweets;
addScript('http://twitter.com/statuses/user_timeline/annparparita.json?' +
    'callback=renderTweets&count=3');

window['renderBlogroll'] = renderBlogroll;
addScript('http://www.google.com/reader/public/javascript-sub/' +
    'user/00302724078372822531/bundle/Blogroll?' +
    'callback=renderBlogroll');

})();
