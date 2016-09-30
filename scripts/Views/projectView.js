//Code for Home and About links to act as tabs
(function(module) {
  var projectViews = {};

  projectViews.aboutOrProjects = function () {

    $('nav').on('click', 'ul li:lt(2)',function(){
      $('#about').hide();
      $('#projects').hide();
      var $text = $(this).text().toLowerCase();
      $('#' + $text).show();
      if ($text === 'about') {
        $('#category-filter').hide();
      } else {
        $('#category-filter').show();
      }

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
      } else {
        $('article').show();
      }

    });
  };

  projectViews.wordFrequency = function() {
  // THIS WORKS, BUT I THINK I CAN CLEAN IT UP BY CHAINING METHODS
    var words = []
    // Project.all[0].body.split(' ');
    // console.log(words);
    //
    // .forEach(function(project) {
    //   return project.body.split(' ');
    // });

    Project.all.forEach(function(item) {
      words.push(item.body.split(' '));
    });

    console.log(words);

    words = words.reduce(function(acc, curr){
      acc = acc.concat(curr);
      return acc;
    });

    console.log("after concat " + words);


    var uniqueWords =  words.reduce(function(acc, curr) {
      acc[curr] = 0;
      return acc;
    },{});
    console.log(uniqueWords);
    words.forEach(function(w){
      if (w in uniqueWords) {
        uniqueWords[w] += 1;
      //  console.log(w);
      }
    });
   console.log(uniqueWords);
    return uniqueWords;

  };

  projectViews.initWordFrequency = function(wordFrequency) {
    var highFrequency = [];
    //console.log(wordFrequency);
    for (var key in wordFrequency){
      if (wordFrequency[key] >= 6) {
        highFrequency.push(key);
      }
    }
    var mostUsedWords = highFrequency.reduce(function(acc, curr){
      return acc + ', ' + curr;
    });
    $('#most-used-words').append('<span>' + mostUsedWords + '</span>');
    console.log(highFrequency);
  };

  // projectViews.wordCount = function() {
  //   return Project.all.map(function(article) {
  //     return article.body.match(/\w+/g).length;
  //   }).reduce(function(acc, curr){
  //     return acc + curr;
  //   });
  // };
  // projectViews.initWordCount = function() {
  //   $('#words').text(projectViews.wordCount());
  // };


  module.projectViews = projectViews;
  Project.fetchAll(projectViews.renderIndexPage);
  // projectViews.initWordCount();
  projectViews.initWordFrequency(projectViews.wordFrequency());
  projectViews.handleCategoryFilter();


})(window);
