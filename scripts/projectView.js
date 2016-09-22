//Code for Home and About links to act as tabs

var projectViews = {};

projectViews.aboutOrProjects = function () {

  $('nav ul li:lt(2)').on('click', function(){
    $('#about').hide();
    $('#projects').hide();
    var $text = $(this).text().toLowerCase();
    console.log('#' + $text);
    $('#' + $text).show();

  });
};


projectViews.aboutOrProjects();
