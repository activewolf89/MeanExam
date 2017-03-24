MyModule.controller("ControllerLogin", function($scope,$location,UserFactory){
UserFactory.show(function(result){

  if(result.data == "redirect"){
    $location.url('/')
  }
  if(result.data.Result == "Existing_User"){
    $scope.welcome_back = true
    $scope.new_welcome = false
    $scope.id = result.data.Object._id
  }
  else{
    $scope.new_welcome = true
    $scope.welcome_back = false
    $scope.id = result.data.Object._id
  }

})//result of the show for the current user
UserFactory.showsurvey(function(result){
  console.log(result, 'result')

  $scope.survey_questions = result.data
})//show the surveys
$scope.deleteit = function(survey){
  UserFactory.deleteit(survey, function(response){
    console.log(response, 'at the controller client')
    UserFactory.showsurvey(function(result){
      console.log(result, 'result')

      $scope.survey_questions = result.data
    })//show the surveys
  })
}

})//ControllerLogin
