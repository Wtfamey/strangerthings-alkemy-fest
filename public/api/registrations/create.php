// Check if user is logged in (session-based authentication)
session_start();
if(!isset($_SESSION['user_id']) || !$_SESSION['user_id']){
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "You must be logged in to register for events."));
    exit;
}

// Get POST data
include_once '../config/database.php';
$data = json_decode(file_get_contents("php://input"));

// Debug: Log the received data
error_log("Registration API received data: " . json_encode($data));

// Validate required fields
if(empty($data->user_id) || empty($data->event_id)){
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "User ID and Event ID are required."));
    exit;
}

try {
    // Check if event exists and registration is open
    $check_query = "SELECT e.*, COUNT(r.id) as registered_count FROM events e LEFT JOIN registrations r ON e.id = r.event_id WHERE e.id = ? GROUP BY e.id";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->execute([$data->event_id]);
    $event_data = $check_stmt->fetch(PDO::FETCH_ASSOC);
    
    if(!$event_data){
        http_response_code(404);
        echo json_encode(array("success" => false, "message" => "Event not found."));
        exit;
    }
    
    // Check if registration is open and not full
    if(!$event_data['registration_open']){
        http_response_code(403);
        echo json_encode(array("success" => false, "message" => "Registration for this event is currently closed."));
        exit;
    }
    
    if($event_data['registered_count'] >= $event_data['capacity']){
        http_response_code(403);
        echo json_encode(array("success" => false, "message" => "This event is already full."));
        exit;
    }
    
    // Check if user is already registered
    $duplicate_check = "SELECT id FROM registrations WHERE user_id = ? AND event_id = ?";
    $duplicate_stmt = $db->prepare($duplicate_check);
    $duplicate_stmt->execute([$data->user_id, $data->event_id]);
    
    if($duplicate_stmt->rowCount() > 0){
        http_response_code(409);
        echo json_encode(array("success" => false, "message" => "You are already registered for this event."));
        exit;
    }
    
    // Create registration
    $query = "INSERT INTO registrations (user_id, event_id, registration_date, status) VALUES (?, ?, NOW(), 'confirmed')";
    $stmt = $db->prepare($query);
    
    if($stmt->execute([$data->user_id, $data->event_id])){
        http_response_code(201);
        echo json_encode(array(
            "success" => true,
            "message" => "Registration successful.",
            "registration_id" => $db->lastInsertId()
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to create registration."));
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "Database error: " . $e->getMessage()));
}
?>
