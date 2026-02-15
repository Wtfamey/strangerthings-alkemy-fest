<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate, max-age=0");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=stranger_things_db", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get event types with event counts
    $query = "SELECT et.*, COUNT(e.id) as event_count 
              FROM event_types et 
              LEFT JOIN events e ON et.id = e.event_type_id 
              GROUP BY et.id 
              ORDER BY et.id";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $event_types = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get events for each type
    foreach ($event_types as &$type) {
        $events_query = "SELECT id, title, description, date, location, capacity, price 
                        FROM events 
                        WHERE event_type_id = :type_id 
                        ORDER BY date";
        
        $events_stmt = $pdo->prepare($events_query);
        $events_stmt->bindParam(':type_id', $type['id']);
        $events_stmt->execute();
        
        $type['events'] = $events_stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode([
        "success" => true,
        "data" => $event_types,
        "count" => count($event_types),
        "timestamp" => date("Y-m-d H:i:s"),
        "cache_bust" => time()
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage(),
        "timestamp" => date("Y-m-d H:i:s"),
        "cache_bust" => time()
    ]);
}
?>
