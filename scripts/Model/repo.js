var repos = {};

repos.allRepos = [];

repos.requestRepos = function(callback) {
  $.ajax('/github/users/dchasepdx/repos', {
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
    aRepo.created = aRepo.created_at.split('T')[0];
    aRepo.updated = aRepo.updated_at.split('T')[0];
    return aRepo[myAttr];
  });
};
