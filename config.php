<?php
$host = "localhost";
$user = "root"; // MySQL user name
$pass = ""; //  MySQL password
$dbname = "trading_journal";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "connection Successful";
?>