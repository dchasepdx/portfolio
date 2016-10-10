//Code for Home and About links to act as tabs
(function(module) {
  var projectViews = {};


  projectViews.renderIndexPage = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml('#project-template'));
      if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#category-filter-template')));
      };
      $('#about').hide();
    });



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
    var words = [];


    Project.all.forEach(function(item) {
      words.push(item.body.split(' '));

    });



    words = words.reduce(function(acc, curr){
      acc = acc.concat(curr);
      return acc;
    });



    var uniqueWords =  words.reduce(function(acc, curr) {
      acc[curr] = 0;
      return acc;
    },{});
    words.forEach(function(w){
      if (w in uniqueWords) {
        uniqueWords[w] += 1;
      }
    });
    return uniqueWords;

  };

  projectViews.initWordFrequency = function(wordFrequency) {
    var highFrequency = [];
    for (var key in wordFrequency){
      if (wordFrequency[key] >= 4) {
        highFrequency.push(key);
      }
    }
    var mostUsedWords = highFrequency.reduce(function(acc, curr){
      return acc + ', ' + curr;
    });
    $('#most-used-words').append('<span>' + mostUsedWords + '</span>');
  };



  module.projectViews = projectViews;
  Project.fetchAll(projectViews.renderIndexPage);
  projectViews.initWordFrequency(projectViews.wordFrequency());
  projectViews.handleCategoryFilter();


})(window);
