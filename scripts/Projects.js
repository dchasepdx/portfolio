
//code taken from day 2 jquery and dom lab



function Project(opts) {
  this.title = opts.title;
  this.reason = opts.reason;
  this.url = opts.url;
  this.published = opts.published;
  this.body = opts.body;
  this.img = opts.img;
  this.anchor = opts.anchor;
};
Project.all = [];

Project.prototype.toHtml = function() {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.published))/60/60/24/1000);
  this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this);
  return html;
};



Project.loadAll = function(data) {
  
  data.sort(function(a,b) {
    return (new Date(b.published)) - (new Date(a.published));
  }).forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  var text;
  if (localStorage.projects) {
    text = localStorage.getItem('projects');
    text = JSON.parse(text);
    Project.loadAll(text);
    projectViews.renderIndexPage();
  } else {
    $.getJSON('data/projects.json').done(function(data){
      text = JSON.stringify(data);
      localStorage.setItem('projects', text);
      text = JSON.parse(text);
      Project.loadAll(text);
      ProjectViews.renderIndexPage();
    }).fail(function(){
      $('#about').prepend('<h1>Sorry, we couldn\'t load the projects');
    });
  }
};


// projectData.sort(function(curElem, nextElem) {
//   return (new Date(nextElem.published)) - (new Date(curElem.published));
// });
//
// projectData.forEach(function(ele) {
//   projects.push(new Project(ele));
// });
//
// projects.forEach(function(a) {
//   $('#projects').append(a.toHtml());
// });
