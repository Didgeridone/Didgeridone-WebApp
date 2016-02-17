app.controller('HomeController', function($scope) {
    $scope.title = "Didgeridone"
})
app.controller('DashboardController', function($scope, $http) {

  $scope.checkRadius = function(){
    if(this.radius===this.value){
      return true
    }
    else {
      return false
    }
  }

    $http({
        method: 'GET',
        url: ' https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612',
        headers: {
            'Accept': 'application/json, text/javascript, /; q=0.01',
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).success(function(data, status) {
        $scope.data = []
        for (i = 0; i < data.user.tasks.length; i++) {
            $scope.data.push(data.user.tasks[i])
        }
        console.log($scope.data)
    }).error(function(data, status) {
        console.log(status)
    });
    $scope.deleteTask = function(task_id) {
        console.log(task_id)
                $http.delete('https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612/' + task_id).success(function(data, status, headers) {
                    $scope.groups.splice(task_id-1, 1)
                }).error(function(data, status, header, config) {
                  console.error('YOU SUCK')
                })
    }
    $scope.updateTask = function() {
        $http.put('https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612/').success(function(response, status, headers, config) {
            console.log(response)
        }).error(function(response, status, headers, config) {
            $scope.error_message = response.error_message;
        });
    };
    $scope.taskObject = {
        name: "",
        lat: "lat",
        long: "long",
        radius: 10,
        done: false,
        enter: true
    }
    $scope.addTask = function() {
        console.log($scope.taskObject)
        $scope.data.push($scope.taskObject);
        $scope.postTask()
    }
    $scope.postTask = function() {
        $http({
              url: 'https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612',
              method: "POST",
              data: JSON.stringify($scope.taskObject),
              headers: {
                  'Content-Type': 'application/json',
              }
          }).success(function(data, status, headers, config) {
           console.log(data)
         }).error(function(data, status, headers, config) {
              // need to create form validation controller if query is empty
              console.log(status)
              })

                  // $scope.status = status + ' ' + headers;
      }
});
