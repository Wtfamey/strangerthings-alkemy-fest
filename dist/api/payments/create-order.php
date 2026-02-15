<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->amount) || !isset($data->currency)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Razorpay test key (replace with your actual key in production)
$keyId = 'rzp_test_YOUR_KEY_ID';
$keySecret = 'YOUR_SECRET_KEY';

// Create order data
$orderData = [
    'receipt' => $data->receipt ?? 'receipt_' . time(),
    'amount' => $data->amount,
    'currency' => $data->currency,
    'payment_capture' => 1,
    'notes' => $data->notes ?? []
];

// For testing purposes, we'll create a mock order
// In production, you would make an actual API call to Razorpay
$orderId = 'order_' . time() . '_' . rand(1000, 9999);

// Mock response for testing
$response = [
    'success' => true,
    'order_id' => $orderId,
    'amount' => $data->amount,
    'currency' => $data->currency,
    'receipt' => $orderData['receipt'],
    'notes' => $orderData['notes']
];

echo json_encode($response);

/*
// Uncomment this for production use with actual Razorpay API
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.razorpay.com/v1/orders',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($orderData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode($keyId . ':' . $keySecret)
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'cURL Error #: ' . $err]);
} else {
    echo $response;
}
*/
?>
