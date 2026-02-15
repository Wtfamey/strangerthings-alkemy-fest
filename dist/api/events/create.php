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

if(!empty($data->title) && !empty($data->date) && !empty($data->location) && !empty($data->capacity) && !empty($data->event_type_id)){
    $query = "INSERT INTO events SET title=:title, description=:description, date=:date, location=:location, capacity=:capacity, price=:price, image_url=:image_url, event_type_id=:event_type_id";
    $stmt = $db->prepare($query);

    // Set default price if not provided
    $price = $data->price ?? 0.00;

    $stmt->bindParam(":title", $data->title);
    $stmt->bindParam(":description", $data->description);
    $stmt->bindParam(":date", $data->date);
    $stmt->bindParam(":location", $data->location);
    $stmt->bindParam(":capacity", $data->capacity);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":image_url", $data->image_url);
    $stmt->bindParam(":event_type_id", $data->event_type_id);

    if($stmt->execute()){
        http_response_code(201);
        echo json_encode(array("message" => "Event was created."));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create event."));
    }
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create event. Data is incomplete."));
}
?>
