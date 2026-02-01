<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM events ORDER BY date ASC";
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
            "title" => $title,
            "description" => $description,
            "date" => $date,
            "location" => $location,
            "capacity" => $capacity,
            "price" => $price,
            "image_url" => $image_url
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
