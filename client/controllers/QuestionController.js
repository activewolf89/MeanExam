MyModule.controller("QuestionController", function($scope,$location,QuestionFactory){
$scope.submit = function(question){
  QuestionFactory.add_question(question, function(response){
    console.log(response, 'responseee')
    if(response.data != 'success'){
      $scope.error = response.data
    }
    else{
      $location.url('/login')
    }
  })//response from server/factory

}
})//end of controller
