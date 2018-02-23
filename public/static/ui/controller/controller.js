app.controller('testController', function($scope, $http) {

 $scope.searchSkill = "";
 $scope.skillList = [];
 $scope.showAdd = false;
 $scope.addSkills = {
  "id": "",
  "name": "",
  "status": null
 }

 var localData = localStorage.getItem('data');
 console.log('localData ',localData);
// $scope.skillList.push(JSON.parse(localData))

  $scope.addSkill = function() {
  $scope.addSkills.id = $scope.skillList.length + 1;
  $scope.skillList.push($scope.addSkills);
  localStorage.setItem('data', JSON.stringify($scope.addSkills));
  $scope.add();
  $scope.addSkills = {}
 }

 $scope.changeSkill = function(obj) {

  console.log(obj);
  var a = $scope.skillList.indexOf(obj);
  $scope.skillList[a] = {
   "id": obj.id,
   "name": obj.name,
   "status": obj.status
  }
$scope.edit(obj);
   $scope.openEdit = false;
  localStorage.setItem('data', JSON.stringify(obj))
 }

 $scope.changeStatus = function(obj){
   console.log(obj.list);
   $scope.status(obj.list.id, obj.list['status']);
  //alert("Your skill is " + obj)
 }

$scope.searchForSkill = function(obj){
  console.log($scope.searchSkill);
  console.log(obj);
  console.log(obj.searchSkill);
  //$scope.searchSkill = "";
  $http.get('http://localhost:3000/api/skills/').then(function(res) {
      console.log($scope.skillList);
    var searchArr = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i]['name'].toLowerCase().includes(obj.searchSkill)){
            searchArr[0] = res.data[i];
            $scope.skillList = searchArr;
        }
      }
      console.log($scope.skillList);
 });
}

/***************************************************************************************

            Please refer below angular code for calling apis


***************************************************************************************/

$http.get('http://localhost:3000/api/skills/').then(function(res) {
    $scope.skillList = res.data;
 });

  //Add
  $scope.add = function() {
    console.log('new skill details',$scope.addSkills);
   $http.post('http://localhost:3000/api/skills/', { name: $scope.addSkills.name, status: $scope.addSkills.status })
    .then(function(res) {
      alert('Skill added successfully!');
        $scope.addSkills = {};
    }).catch(e => {$scope.addSkills = {};});
  }

  //Edit

  $scope.edit = function(obj) {
    $scope.data = $scope.skillList[obj.id-1];
    console.log('$scope.data ',$scope.data);
    $http
      .put('http://localhost:3000/api/skills/'+ obj.id +'/update', { name: $scope.data.name })
      .then(function(res) {
        alert('Skill updated Successfully');
      });
    $scope.openEdit = false;
  }


  //Change Status

  $scope.status = function(index, status){
    //Approve
    console.log('index ',index);
    console.log('status ',status);
    $http
      .put('http://localhost:3000/api/skills/'+ index +'/approve', { status: status })
      .then(function(res) {
        alert('This skill is ' + (status == true ? 'Approved' : 'Rejected'));
      });
   }
 })
