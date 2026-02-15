<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Test events API with event_type_id parameter
$event_type_id = isset($_GET["event_type_id"]) ? $_GET["event_type_id"] : 1;

$query = "SELECT * FROM events WHERE event_type_id = ? ORDER BY date ASC";
$stmt = $db->prepare($query);
$stmt->execute([$event_type_id]);

$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "event_type_id" => $event_type_id,
    "count" => count($events),
    "events" => $events
]);
?>
