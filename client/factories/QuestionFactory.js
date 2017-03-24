MyModule.factory('QuestionFactory', function($http){
  factory = {}
  factory.add_question = function(question, callback){

    $http.post('/question',question)
    .then(function(response){
      callback(response)
    })
  }, //end of add question
  factory.showpoll = function(id,callback){
    $http.get(`/individualpoll${id}`)
    .then(function(response){
      callback(response)
    })
  }, //end of show poll
  factory.pollsinfo = function(id, callback){
    $http.get(`/pollsinfo${id}`)
    .then(function(response){
      callback(response)
    })
  }, //end of polls info
  factory.vote = function(vote, callback){
    $http.post('/count', vote)
    .then(function(response){
      callback(response)
    })
  }
  return factory
})// end of factory
