<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'api/config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Read all events
        $query = "SELECT id, title, description, date, location, capacity FROM events ORDER BY created_at DESC";
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
                    "capacity" => $capacity
                );
                array_push($events_arr["records"], $event_item);
            }
            http_response_code(200);
            echo json_encode($events_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No events found."));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
