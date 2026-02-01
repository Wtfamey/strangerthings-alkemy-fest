<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->user_id) && !empty($data->event_id)){
    
    // Check if already registered
    $check_query = "SELECT id FROM registrations WHERE user_id = :user_id AND event_id = :event_id";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(':user_id', $data->user_id);
    $check_stmt->bindParam(':event_id', $data->event_id);
    $check_stmt->execute();

    if($check_stmt->rowCount() > 0){
        http_response_code(400);
        echo json_encode(array("message" => "User already registered for this event."));
        exit;
    }

    $query = "INSERT INTO registrations SET user_id=:user_id, event_id=:event_id, status='confirmed'";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":user_id", $data->user_id);
    $stmt->bindParam(":event_id", $data->event_id);

    if($stmt->execute()){
        http_response_code(201);
        echo json_encode(array("message" => "Registration successful."));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to register."));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register. Data is incomplete."));
}
?>
