

function Project(opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
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

  Project.all = data.sort(function(a,b) {
    return (new Date(b.published)) - (new Date(a.published));
  }).map(function(ele) {
    return new Project(ele);
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
      projectViews.renderIndexPage();
    }).fail(function(){
      $('#about').prepend('<h1>Sorry, we couldn\'t load the projects');
    });
  }
};
