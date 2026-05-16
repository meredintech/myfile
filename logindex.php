<?php
include("config.php");
?>
<!DOCTYPE html>
<html>
   <head>
     <meta cherset = "utf-8">
     <meta name = "viewport" content "width=device-width, intial-scale=1.0">
  <title>Login Form</title>
  <link rel ="stylesheet" type ="text/css" href ="mystyle.css">
  <head>
  <body>
    <div id ="form">
    <h1>Log in Form</h1>
	<form name= "form" action ="login.php" onsubmit="return isvalid()" method="POST">
	<p>
	 <label>Username:</label>
	<input type = "text" id= "user" name = "user"></p>
	<p>
	<label>Password:</label>
	<input type = "text" id ="pass" name = "pass"></p>
	<input type ="submit" id ="btn" value ="login" name ="submit">
	</form>
    </div>
	<script>
	function isvalid(){
		var user = document.form.user.value;
		var pass = document.form.pass.value;
		if(user.length=="" && pass.length==""){
			alert("Username and password field is empty!!!");
			return false;
		}
		else{
			if(user.length==""){
				alert("username is empty!!!");
				return false;
			}
			if(pass.length==""){
				alert("Password is empty!!!");
				return false;
			}
		}
	}
	</script>
</body>
<html/>