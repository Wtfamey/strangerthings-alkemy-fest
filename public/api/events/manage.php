<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Read all events
        $query = "SELECT * FROM events ORDER BY date ASC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $num = $stmt->rowCount();
        $events_arr = array();
        $events_arr["records"] = array();
        
        if($num > 0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $event_item = array(
                    "id" => $id,
                    "title" => $title,
                    "description" => $description,
                    "date" => $date,
                    "location" => $location,
                    "capacity" => $capacity,
                    "image_url" => $image_url,
                    "created_at" => $created_at
                );
                array_push($events_arr["records"], $event_item);
            }
            http_response_code(200);
        } else {
            http_response_code(200);
            $events_arr["records"] = [];
        }
        
        echo json_encode($events_arr);
        break;
        
    case 'POST':
        // Create new event
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->title) && !empty($data->date) && !empty($data->location) && !empty($data->capacity)) {
            $query = "INSERT INTO events (title, description, date, location, capacity, image_url) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(1, $data->title);
            $stmt->bindParam(2, $data->description);
            $stmt->bindParam(3, $data->date);
            $stmt->bindParam(4, $data->location);
            $stmt->bindParam(5, $data->capacity);
            $stmt->bindParam(6, $data->image_url);
            
            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Event created successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to create event."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create event. Data is incomplete."));
        }
        break;
        
    case 'PUT':
        // Update event
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            $query = "UPDATE events SET title = ?, description = ?, date = ?, location = ?, capacity = ?, image_url = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(1, $data->title);
            $stmt->bindParam(2, $data->description);
            $stmt->bindParam(3, $data->date);
            $stmt->bindParam(4, $data->location);
            $stmt->bindParam(5, $data->capacity);
            $stmt->bindParam(6, $data->image_url);
            $stmt->bindParam(7, $data->id);
            
            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Event updated successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to update event."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update event. Data is incomplete."));
        }
        break;
        
    case 'DELETE':
        // Delete event
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            $query = "DELETE FROM events WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $data->id);
            
            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Event deleted successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to delete event."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete event. Data is incomplete."));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
