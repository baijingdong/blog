var fs = require('hexo-fs');

hexo.extend.generator.register('raw_markdown', function(locals){
  // console.log(locals.posts.data[locals.posts.data.length - 1]);process.exit();
  var list = {posts: [], pages: []};
  var ret = [];
  var posts = locals.posts.data.filter(function(post) {
    return post.published;
  }).map(function(post) {
    var path = 'raw/posts/' + post.slug + '.md';
    list.posts.push(path);
    return {
      path: path,
      data: post.raw
    };
  });
  var pages = locals.pages.data.filter(function(pages) {
    return /^pages\//.test(pages.source);
  }).map(function(page) {
    var path = 'raw/' + page.source;
    list.pages.push(path);
    return {
      path: path,
      data: page.raw
    };
  });
  ret = ret.concat(posts).concat(pages).concat([{
    path: 'raw/list.json',
    data: JSON.stringify(list)
  }]);
  return ret;
});