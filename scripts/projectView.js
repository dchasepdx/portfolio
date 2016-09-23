//Code for Home and About links to act as tabs

var projectViews = {};

projectViews.aboutOrProjects = function () {

  $('nav').on('click', 'ul li:lt(2)',function(){
    $('#about').hide();
    $('#projects').hide();
    var $text = $(this).text().toLowerCase();
    console.log('#' + $text);
    $('#' + $text).show();

  });
};


projectViews.aboutOrProjects();
