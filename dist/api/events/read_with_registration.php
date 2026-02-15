<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "
    SELECT 
        e.*,
        COUNT(r.id) as registered_count,
        CASE 
            WHEN COUNT(r.id) >= e.capacity THEN FALSE 
            ELSE COALESCE(e.registration_open, TRUE) 
        END as registration_open
    FROM events e
    LEFT JOIN registrations r ON e.id = r.event_id
    GROUP BY e.id
    ORDER BY e.date ASC
";

$stmt = $db->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

if($num > 0){
    $events_arr = array();
    $events_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        
        $event_item = array(
            "id" => $id,
            "event_type_id" => $event_type_id,
            "title" => $title,
            "description" => $description,
            "date" => $date,
            "location" => $location,
            "capacity" => $capacity,
            "price" => $price,
            "image_url" => $image_url,
            "registration_open" => $registration_open,
            "registered_count" => $registered_count
        );
        
        array_push($events_arr["records"], $event_item);
    }
    
    http_response_code(200);
    echo json_encode($events_arr);
}
else{
    http_response_code(200); // OK but empty
    echo json_encode(array("records" => []));
}
?>
