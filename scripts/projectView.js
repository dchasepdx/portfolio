//Code for Home and About links to act as tabs

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
Project.fetchAll();
