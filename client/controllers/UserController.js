MyModule.controller('UserController',function($scope,UserFactory,$location){
$scope.name = "Reed"
$scope.submit = function(user){
  UserFactory.log_user(user, function(result){
    console.log(result)
    if(result.data.name == "ValidationError"){
    $scope.error = result.data.message
  }//error to show on page
  else if(result.data == 'Needs to be alphanumeric'){
    $scope.error = result.data
  }
  else if(result.data =="Please Enter Info and not try to break my code"){
    $scope.error = result.data
  }
  else{
    $location.url('/login')
  }
  })//callback
}//user

})//controller
