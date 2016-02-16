app.controller('HomeController', function($scope) {
    $scope.title = "Didgeridone"
})
app.controller('DashboardController', function($scope, $http) {
    $http({
        method: 'GET',
        url: ' https://didgeridone.herokuapp.com/task/56c252022afa221bdcaabcb5',
        headers: {
            'Accept': 'application/json, text/javascript, /; q=0.01',
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).success(function(data, status) {
        console.log(data.user.tasks[0].name)
        $scope.groups = []
        for (i = 0; i < data.user.tasks.length; i++) {
            $scope.groups.push(data.user.tasks[i].name)
        }
        console.log($scope.groups)
        $scope.index = $scope.groups.length
        $scope.addTask = function() {}
        $scope.items = ['Item 1', 'Item 2', 'Item 3'];
        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }).error(function(data, status) {
     console.log(status)
    });
});
      $scope.postTask = function() {   
      	$http({
              url: ' https://didgeridone.herokuapp.com/task/56c252022afa221bdcaabcb5',
              method: "POST",
              // data: JSON.stringify({
            	//names of data parameters
              //     "name": "",
              //     "query": ""
              // }),
              headers: {
                  'Content-Type': 'application/json',
                  // 'apiKey': 'Y2hvd2NoZWNrZXIyMDE1'
              }
          }).success(function(data, status, headers, config) {
           console.log(data)
          }).error(function(foodData, status, headers, config) {
              // need to create form validation controller if query is empty
              console.log(status)
              })
              
                  // $scope.status = status + ' ' + headers;
      }
      $scope.deleteTask = function() {
          
      }
