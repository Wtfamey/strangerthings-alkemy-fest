<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing registration ID']);
    exit;
}

// Update payment status
if (isset($data->payment_status)) {
    $query = "UPDATE registrations 
             SET payment_status = ?, 
                 razorpay_payment_id = ?, 
                 razorpay_order_id = ?, 
                 amount_paid = ?, 
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ?";
    
    $stmt = $db->prepare($query);
    
    $razorpay_payment_id = $data->razorpay_payment_id ?? null;
    $razorpay_order_id = $data->razorpay_order_id ?? null;
    $amount_paid = $data->amount_paid ?? 0.00;
    
    $stmt->bindParam(1, $data->payment_status);
    $stmt->bindParam(2, $razorpay_payment_id);
    $stmt->bindParam(3, $razorpay_order_id);
    $stmt->bindParam(4, $amount_paid);
    $stmt->bindParam(5, $data->id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Payment status updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update payment status']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing payment status']);
}
?>
