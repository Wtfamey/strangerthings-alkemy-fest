<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->event_id)){
    // Toggle individual event registration
    $query = "UPDATE events SET registration_open = NOT registration_open WHERE id = :event_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":event_id", $data->event_id);
    
    if($stmt->execute()){
        // Get updated status
        $status_query = "SELECT registration_open FROM events WHERE id = :event_id";
        $status_stmt = $db->prepare($status_query);
        $status_stmt->bindParam(":event_id", $data->event_id);
        $status_stmt->execute();
        $status = $status_stmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode(array(
            "message" => "Event registration status updated successfully.",
            "registration_open" => $status['registration_open']
        ));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update event registration status."));
    }
}
else if(!empty($data->action) && $data->action === "toggle_all"){
    // Toggle all events registration
    $query = "UPDATE events SET registration_open = NOT registration_open";
    $stmt = $db->prepare($query);
    
    if($stmt->execute()){
        // Get updated count
        $count_query = "SELECT COUNT(*) as total, SUM(registration_open) as open FROM events";
        $count_stmt = $db->prepare($count_query);
        $count_stmt->execute();
        $counts = $count_stmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode(array(
            "message" => "All events registration status updated successfully.",
            "total_events" => $counts['total'],
            "open_events" => $counts['open']
        ));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update all events registration status."));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Invalid request. Event ID or action required."));
}
?>
