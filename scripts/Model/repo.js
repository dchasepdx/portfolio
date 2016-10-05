var repos = {};

repos.allRepos = [];

repos.requestRepos = function(callback) {
  $.ajax('https://api.github.com/users/dchasepdx/repos', {
    headers: {
      Authorization: 'token ' + token
    }
  }).done(function(data){
    data.forEach(function(obj){
      repos.allRepos.push(obj);
    });
    callback();
  });
};

repos.withTheAttribute = function(myAttr) {
  return repos.allRepos.filter(function(aRepo){
    return aRepo[myAttr];
  });
};
