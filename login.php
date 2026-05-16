<?php
include("config.php");
	if(isset($_POST['submit'])){
		$username = $_POST['user'];
		$password = $_POST['pass'];
$sql = "select * from login where username = '$username' and password = '$password'";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$count = mysqli_num_rows($result);
if($count==1){
	header("Location:welcome.php");
}
else{
	echo '<script>
	window.location.href = "index.html";
	alert("login failed. Invalid username or password")
	</script>';
}
}

?>