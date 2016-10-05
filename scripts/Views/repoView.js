var repoView = {};

var repoCompiler = Handlebars.compile($('#repo-template').html());

repoView.renderRepos = function() {
  $('#repos').empty().append(repos.withTheAttribute('description').map(repoCompiler));
};

repos.requestRepos(repoView.renderRepos);
