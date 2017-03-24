MyModule.factory('UserFactory',function($http){
factory = {}
factory.log_user = function(user, callback){
$http.post('/post', user)
.then(function(response){
  callback(response)
})//response

},//add user
factory.show = function(callback){
  $http.get('/get')
  .then(function(response){
    callback(response)
  })//response with user in session
},//show
factory.showsurvey = function(callback){
  $http.get('/showsurvey')
    .then(function(response){
      callback(response)
    })

}, //end show
factory.deleteit = function(survey, callback){
  $http.post('/deletesurvey',survey)
  .then(function(response){
    callback(response)
  })
}
return factory
})//factory
