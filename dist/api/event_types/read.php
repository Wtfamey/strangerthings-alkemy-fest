<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT et.*, COUNT(e.id) as event_count 
              FROM event_types et 
              LEFT JOIN events e ON et.id = e.event_type_id 
              GROUP BY et.id 
              ORDER BY et.id";
    
    $stmt = $db->prepare($query);
    $stmt->execute();

    $event_types = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get events for each type
    foreach ($event_types as &$type) {
        $events_query = "SELECT id, title, description, date, location, capacity 
                        FROM events 
                        WHERE event_type_id = :type_id 
                        ORDER BY date";
        
        $events_stmt = $db->prepare($events_query);
        $events_stmt->bindParam(':type_id', $type['id']);
        $events_stmt->execute();
        
        $type['events'] = $events_stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'success' => true,
        'data' => $event_types
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
