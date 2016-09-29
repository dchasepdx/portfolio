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
      if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#category-filter-template')));
      };
      $('#about').hide();
    });

    projectViews.aboutOrProjects();

  };

  projectViews.handleCategoryFilter = function() {
    $('#category-filter').on('change', function(){
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="'+ $(this).val() + '"]').show();
        console.log($(this).val());
      } else {
        $('article').show();
      }

    });
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
  projectViews.handleCategoryFilter();


})(window);
