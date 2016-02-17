app.controller('HomeController', function($scope) {
    $scope.title = "Didgeridone"
})
app.controller('DashboardController', function($scope, $http) {


  $scope.editmode = false;
  $scope.toggleEditMode = function(){
    $scope.editmode = $scope.editmode === false ? true: false;
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
    $scope.deleteTask = function(datem) {
        console.log(datem.task_id)
                $http.delete('https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612/' + datem.task_id).success(function(data, status, headers) {
                  var taskIndex = $scope.data.indexOf(datem)
                    $scope.data.splice(taskIndex, 1)
                }).error(function(data, status, header, config) {
                  console.error('YOU SUCK')
                })
    }
    $scope.updateTask = function(datem) {
      console.log(datem)

        $http({
          url: 'https://didgeridone.herokuapp.com/task/56c3ad2db2273e8c7c9d3612/' + datem.task_id,
          method: "PUT",
          data: angular.toJson(datem),
          headers: {
              'Content-Type': 'application/json',
          }
      }).success(function(response, status, headers, config) {
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
    $scope.addTask = function(ObjectID) {
        $scope.taskObject.task_id=ObjectID
        console.log($scope.taskObject)
        $scope.data.push($scope.taskObject);
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
           $scope.addTask(data.new_task.task_id)
          console.log(data.new_task)
         }).error(function(data, status, headers, config) {
              // need to create form validation controller if query is empty
              console.log(status)
              })
      }

    $scope.addBoolean = false;

    $scope.toggleAdd = function(){
      if($scope.addBoolean==false){
        $scope.addBoolean=true;
      } else {
        $scope.addBoolean=false;
      }
    }
    $scope.addBoolean = false;

    $scope.editBoolean = false;
    $scope.toggleEdit = function () {
        $scope.editBoolean = !$scope.editBoolean;
    };
    $scope.blurTest = function (){
      console.log('working blur')
    }
});
