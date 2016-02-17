app.controller('HomeController', function($scope) {
    $scope.title = "Didgeridone"
})
app.controller('DashboardController', function($scope, $http) {
    $http({
        method: 'GET',
        url: ' https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612',
        headers: {
            'Accept': 'application/json, text/javascript, /; q=0.01',
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).success(function(data, status) {
        console.log(data.user.tasks[0].name)
        $scope.groups = []
        // $scope.task_id = []
        $scope.data = []
        for (i = 0; i < data.user.tasks.length; i++) {
            $scope.groups.push(data.user.tasks[i].name)
        }
        // for (i = 0; i < data.user.tasks.length; i++) {
        //     $scope.task_id.push(data.user.tasks[i].task_id)
        // }
        for (i = 0; i < data.user.tasks.length; i++) {
            $scope.data.push(data.user.tasks[i])
        }
        console.log($scope.data)
        console.log($scope.task_id);
        // console.log(data.user.tasks[4].task_id)
        console.log($scope.groups)
        $scope.index = $scope.groups.length
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
        $scope.groups.push($scope.taskObject.name);
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
