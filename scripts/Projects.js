//code taken from day 2 jquery and dom lab

var projects = [];

function Project(opts) {
  this.title = opts.title;
  this.reason = opts.reason;
  this.url = opts.url;
  this.published = opts.published;
  this.body = opts.body;
  this.img = opts.img;
  this.anchor = opts.anchor;
};

Project.prototype.toHtml = function() {
  // var $newProject = $('article.template').clone();
  //
  // $newProject.find('section h1').html(this.title);
  // $newProject.find('div.byline  h2').text(this.reason);
  // $newProject.find('section a').attr({'href':this.url, 'name': this.anchor});
  // $newProject.find('time[pubdate]').attr('title', this.published);
  // $newProject.find('time').html(' about ' + parseInt(Math.round(new Date() - new Date(this.published))/60/60/24/1000) + ' days ago');
  // $newProject.find('.project-body').html(this.body);
  // $newProject.find('img').attr('src', this.img);
  // $newProject.removeAttr('class');

  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.published))/60/60/24/1000);
  this.publishStatus = this.published ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  

  var html = template(this);

  return html;
};

projectData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.published)) - (new Date(curElem.published));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
