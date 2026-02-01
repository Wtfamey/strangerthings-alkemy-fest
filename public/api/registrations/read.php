<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Can filter by event_id if query param provided
if (isset($_GET['event_id'])) {
    $event_id = $_GET['event_id'];
    $query = "SELECT r.id, r.status, r.payment_status, r.amount_paid, r.razorpay_payment_id, r.registered_at, u.full_name, u.email, u.phone, e.title as event_title, e.price as event_price 
              FROM registrations r
              JOIN users u ON r.user_id = u.id
              JOIN events e ON r.event_id = e.id
              WHERE r.event_id = ?
              ORDER BY r.registered_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $event_id);
} else {
    $query = "SELECT r.id, r.status, r.payment_status, r.amount_paid, r.razorpay_payment_id, r.registered_at, u.full_name, u.email, u.phone, e.title as event_title, e.price as event_price 
              FROM registrations r
              JOIN users u ON r.user_id = u.id
              JOIN events e ON r.event_id = e.id
              ORDER BY r.registered_at DESC";
    
    $stmt = $db->prepare($query);
}

$stmt->execute();

$num = $stmt->rowCount();

// Calculate payment statistics
$stats = [
    'total_registrations' => 0,
    'paid_registrations' => 0,
    'pending_payments' => 0,
    'failed_payments' => 0,
    'total_revenue' => 0.00
];

if($num > 0){
    $regs_arr = array();
    $regs_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        // Update statistics
        $stats['total_registrations']++;
        switch ($payment_status) {
            case 'paid':
                $stats['paid_registrations']++;
                $stats['total_revenue'] += floatval($amount_paid);
                break;
            case 'pending':
                $stats['pending_payments']++;
                break;
            case 'failed':
                $stats['failed_payments']++;
                break;
        }

        $reg_item = array(
            "id" => $id,
            "user_name" => $full_name,
            "user_email" => $email,
            "user_phone" => $phone,
            "event_title" => $event_title,
            "event_price" => $event_price,
            "status" => $status,
            "payment_status" => $payment_status,
            "amount_paid" => $amount_paid,
            "razorpay_payment_id" => $razorpay_payment_id,
            "registered_at" => $registered_at
        );

        array_push($regs_arr["records"], $reg_item);
    }

    $regs_arr["stats"] = $stats;
    http_response_code(200);
    echo json_encode($regs_arr);
}
else{
    $response = array(
        "records" => [],
        "stats" => $stats
    );
    http_response_code(200);
    echo json_encode($response);
}
?>
