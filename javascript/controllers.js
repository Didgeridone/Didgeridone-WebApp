app.controller('HomeController', function($scope) {
  $scope.title = "Didgeridone"
})

app.controller('DashboardController', function($scope, $http, Auth) {
  //Just illustrating use of factory for auth services
  // console.log('User JWT token: ', Auth.getToken());
  // console.log('User ID: ', Auth.getUserID());

// Inital task load on page load
    $http({
        method: 'GET',
        url: ' https://didgeridone.herokuapp.com/task/'+Auth.getUserID(),
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

    //Get users current location and assign to controller scope variables
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.currentLat = position.coords.latitude.toString();
      $scope.currentLong = position.coords.longitude.toString();
    })


    // API call to return lat/long coordinates of a supplied address
  $scope.locationTest = function(){
    delete $http.defaults.headers.common.Authorization
    $http({
        method: 'GET',
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.locationInfo,
        headers: {
            'Accept': 'application/json, text/javascript, /; q=0.01',
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).success(function(data, status) {
        console.log(data.results[0].geometry.location)
        $scope.taskObject.lat=data.results[0].geometry.location.lat.toString();
        $scope.taskObject.long=data.results[0].geometry.location.lng.toString();
    }).error(function(data, status) {
        console.log(status)
    });

  }

  $scope.locationTestUpdate = function(datem){
    delete $http.defaults.headers.common.Authorization
    // delete datem.
    $http({
        method: 'GET',
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+datem.locationInfo,
        headers: {
            'Accept': 'application/json, text/javascript, /; q=0.01',
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).success(function(data, status) {
        console.log(data.results[0].geometry.location)
        datem.lat= data.results[0].geometry.location.lat.toString();
        datem.long= data.results[0].geometry.location.lng.toString();
        delete datem.locationInfo;
        $scope.updateTask(datem)
    }).error(function(data, status) {
        console.log(status)
    });

  }

  $scope.preventEnter = function(event){
    if(event.which===13){
      event.preventDefault()
    }
  }
  $scope.taskUpdateLocationBool = false;
  $scope.updateLocationBool = function(){
    $scope.taskUpdateLocationBool = $scope.taskUpdateLocationBool === false ? true: false;

  }
  $scope.getLocationUpdate = function(datem){
    datem.lat = $scope.currentLat;
    datem.long = $scope.currentLong;
    $scope.updateTask(datem);
  }

  $scope.getLocation = function(){

    navigator.geolocation.getCurrentPosition(function(position) {

        if($scope.taskObject.lat){
          $scope.taskObject.lat = "";
          $scope.taskObject.long = "";
          return
        }
        console.log(position.coords.latitude, position.coords.longitude);
        $scope.taskObject.lat = position.coords.latitude;
        $scope.taskObject.long = position.coords.longitude;
    });
  }

  $scope.mapBoolean = false;
  $scope.showMap = function(){
    $scope.mapBoolean = $scope.mapBoolean === false ? true: false;
   }

  $scope.editmode = false;
  $scope.toggleEditMode = function(){
    $scope.editmode = $scope.editmode === false ? true: false;
   }

    $scope.deleteTask = function(datem) {
        console.log(datem.task_id)
                $http.delete('https://didgeridone.herokuapp.com/task/'+Auth.getUserID()+'/' + datem.task_id).success(function(data, status, headers) {
                  var taskIndex = $scope.data.indexOf(datem)
                    $scope.data.splice(taskIndex, 1)
                }).error(function(data, status, header, config) {
                  console.error('YOU SUCK')
                })
    }
    $scope.zoomSize = 10;
    $scope.updateTask = function(datem) {
      if(datem.radius > 0 && datem.radius < 5){
            $scope.zoomSize = 14;
          }
          else if(datem.radius >= 5 && datem.radius < 10){
            $scope.zoomSize = 9;
          }
          else{
            $scope.zoomSize = 8;
          }
      console.log(datem)
        $http({
          url: 'https://didgeridone.herokuapp.com/task/'+Auth.getUserID()+'/' + datem.task_id,
          method: "PUT",
          data: angular.toJson(datem),
          headers: {
              'Content-Type': 'application/json',
          }
      }).success(function(datem, status, headers, config) {
            // console.log(datem)
        }).error(function(datem, status, headers, config) {
            $scope.error_message = datem.error_message;
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
              url: 'https://didgeridone.herokuapp.com/task/'+Auth.getUserID(),
              method: "POST",
              data: JSON.stringify($scope.taskObject),
              headers: {
                  'Content-Type': 'application/json',
              }
          }).success(function(data, status, headers, config) {
           $scope.addTask(data.new_task.task_id)
          console.log(data.new_task)
          $scope.taskObject = {
              name: "",
              lat: "lat",
              long: "long",
              radius: 10,
              done: false,
              enter: true
          }
         }).error(function(data, status, headers, config) {
              // need to create form validation controller if query is empty
              console.log(status)
              $scope.taskObject = {
                  name: "",
                  lat: "lat",
                  long: "long",
                  radius: 10,
                  done: false,
                  enter: true
              }
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

app.controller('CreateAccountController', function($scope, $http, Auth) {
  $scope.createNewAccount = function(account) {
    $http({
      method: 'POST',
      url: 'https://didgeridone.herokuapp.com/auth/signup',
      data: {
        email: account.email,
        password: account.password
      }
    }).then(function(response) {
      if (response.data.created_user) {
        Auth.setToken(response.data.token)
        Auth.setUserID(response.data.created_user._id)
        window.location = '/#/dashboard'
      }
    }).catch(function(error) {
      console.log('create user error: ', error);
    })
  }
})

app.controller('LoginController', function($scope, $http, Auth) {
  $scope.login = function(account) {
    $http({
      method: 'POST',
      url: 'https://didgeridone.herokuapp.com/auth/login',
      data: {
        email: account.email,
        password: account.password
      }
    }).then(function(response) {
      if (response.data.user) {
        Auth.setToken(response.data.token)
        Auth.setUserID(response.data.user._id)
        window.location = '/#/dashboard'
      }
    }).catch(function(error) {
      console.log('login error: ', error);
    })
  }
})
