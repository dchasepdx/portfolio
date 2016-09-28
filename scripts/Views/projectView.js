//Code for Home and About links to act as tabs
(function(module) {
  var projectViews = {};

  projectViews.aboutOrProjects = function () {

    $('nav').on('click', 'ul li:lt(2)',function(){
      $('#about').hide();
      $('#projects').hide();
      var $text = $(this).text().toLowerCase();
      $('#' + $text).show();

    });
  };

  projectViews.renderIndexPage = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml('#project-template'));

    });
    projectViews.aboutOrProjects();

  };
  projectViews.wordCount = function() {
    return Project.all.map(function(article) {
      return article.body.match(/\w+/g).length;
    }).reduce(function(acc, curr){
      return acc + curr;
    });
  };
  projectViews.initWordCount = function() {
    $('#words').text(projectViews.wordCount());
  };

  module.projectViews = projectViews;
  Project.fetchAll(projectViews.renderIndexPage);
  projectViews.initWordCount();


})(window);