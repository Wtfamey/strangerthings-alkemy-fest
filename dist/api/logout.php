<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();

// Destroy session
session_destroy();

echo json_encode(array(
    "success" => true,
    "message" => "Logged out successfully"
));
?>
