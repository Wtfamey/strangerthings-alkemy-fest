<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Can filter by user_id if query param provided
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
    $query = "SELECT r.id as registration_id, r.user_id, r.event_id, r.registration_date, r.status,
                     e.title, e.description, e.date, e.location, e.capacity, e.price, e.registration_open,
                     et.name as event_type_name, et.color as event_type_color
              FROM registrations r
              JOIN events e ON r.event_id = e.id
              JOIN event_types et ON e.event_type_id = et.id
              WHERE r.user_id = ?
              ORDER BY e.date ASC";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $user_id);
} else {
    // Admin view - all registrations
    $query = "SELECT r.id as registration_id, r.user_id, r.event_id, r.registration_date, r.status,
                     e.title, e.description, e.date, e.location, e.capacity, e.price, e.registration_open,
                     et.name as event_type_name, et.color as event_type_color,
                     u.full_name, u.email
              FROM registrations r
              JOIN events e ON r.event_id = e.id
              JOIN event_types et ON e.event_type_id = et.id
              JOIN users u ON r.user_id = u.id
              ORDER BY r.registration_date DESC";
    
    $stmt = $db->prepare($query);
}

$stmt->execute();

$num = $stmt->rowCount();

if($num > 0){
    $regs_arr = array();
    $regs_arr["success"] = true;
    $regs_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $reg_item = array(
            "id" => $registration_id,
            "user_id" => $user_id,
            "event_id" => $event_id,
            "title" => $title,
            "description" => $description,
            "date" => $date,
            "location" => $location,
            "capacity" => $capacity,
            "price" => $price,
            "registration_open" => $registration_open,
            "event_type_name" => $event_type_name,
            "event_type_color" => $event_type_color,
            "registration_date" => $registration_date,
            "status" => $status
        );

        // Add user info for admin view
        if (isset($full_name)) {
            $reg_item["user_name"] = $full_name;
            $reg_item["user_email"] = $email;
        }

        array_push($regs_arr["records"], $reg_item);
    }

    http_response_code(200);
    echo json_encode($regs_arr);
}
else{
    $response = array(
        "success" => true,
        "records" => []
    );
    http_response_code(200);
    echo json_encode($response);
}
?>
