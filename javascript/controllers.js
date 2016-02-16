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
        // console.log(data)
        // console.log(data[0].tasks[0].name)
        $scope.groups = []
        for(i = 0; i < data[0].tasks.length; i++) {
            $scope.groups.push(data[0].tasks[i])
    	}
    	// console.log($scope.groups)
            // $scope.status = status;
            // $scope.breeds = [];
            // for (i = 0; i < breedData.list.length; i++) {
            //     $scope.breeds.push(breedData.list[i].Breed)
            // }$scope.oneAtATime = true;
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
    }).error(function(breedData, status) {
        $scope.breedData = data || "Request failed";
        $scope.status = status;
    });
});
//       $scope.postTask = function() {
//       	$http({
//               url: ' https://didgeridone.herokuapp.com/task/56c252022afa221bdcaabcb5',
//               method: "POST",
//               // data: JSON.stringify({
//             	//names of data parameters
//               //     "name": "dogs",
//               //     "query": $scope.food.name + " AND Type:" + $scope.foodType.name
//               // }),
//               headers: {
//                   'Content-Type': 'application/json',
//                   // 'apiKey': 'Y2hvd2NoZWNrZXIyMDE1'
//               }
//           }).success(function(foodData, status, headers, config) {
//               console.log(foodData.name)
//               console.log(foodData.query)
//               console.log(foodData)
//                   // $scope. = data; // assign  $scope.persons here as promise is resolved here
//           }).error(function(foodData, status, headers, config) {
//               // need to create form validation controller if query is empty
//               if($scope.food.name == '' || $scope.foodType.name == ''){
//                   $location.path('/');
//               }
//               console.log($scope.foodType.name)
//               console.log(foodData)
//               console.log(foodData.name)
//               console.log(foodData.query)
//                   // $scope.status = status + ' ' + headers;
//           });
//       }
//       $scope.deleteTask = function() {
//           $scope.food.name = ''
//       }
//
