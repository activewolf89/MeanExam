MyModule.controller("ControllerPoll", function($scope,$location,QuestionFactory, $routeParams){

QuestionFactory.showpoll($routeParams.response,function(response){
  $scope.description = response.data[0].Question
}),
QuestionFactory.pollsinfo($routeParams.response, function(response){

  $scope.pollsinfo = response.data
}),
$scope.vote = function(poll){
  QuestionFactory.vote(poll, function(response){
    console.log(response,'response from serve')
    console.log($scope.pollsinfo)
    QuestionFactory.pollsinfo($routeParams.response, function(response){

      $scope.pollsinfo = response.data
    })
  })


}


})
