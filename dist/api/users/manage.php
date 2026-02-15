<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Read all users
        $query = "SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $num = $stmt->rowCount();
        $users_arr = array();
        $users_arr["records"] = array();
        
        if($num > 0){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $user_item = array(
                    "id" => $id,
                    "full_name" => $full_name,
                    "email" => $email,
                    "role" => $role,
                    "created_at" => $created_at
                );
                array_push($users_arr["records"], $user_item);
            }
            http_response_code(200);
        } else {
            http_response_code(200);
            $users_arr["records"] = [];
        }
        
        echo json_encode($users_arr);
        break;
        
    case 'POST':
        // Create new user
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->full_name) && !empty($data->email) && !empty($data->password)) {
            // Check if email already exists
            $check_query = "SELECT id FROM users WHERE email = ? LIMIT 0,1";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->bindParam(1, $data->email);
            $check_stmt->execute();
            
            if($check_stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(array("message" => "Email already exists."));
                break;
            }
            
            $query = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            
            $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);
            $role = $data->role ?? 'user';
            
            $stmt->bindParam(1, $data->full_name);
            $stmt->bindParam(2, $data->email);
            $stmt->bindParam(3, $hashed_password);
            $stmt->bindParam(4, $role);
            
            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "User created successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to create user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
        }
        break;
        
    case 'PUT':
        // Update user
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            $query = "UPDATE users SET full_name = ?, email = ?, role = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(1, $data->full_name);
            $stmt->bindParam(2, $data->email);
            $stmt->bindParam(3, $data->role);
            $stmt->bindParam(4, $data->id);
            
            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "User updated successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to update user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update user. Data is incomplete."));
        }
        break;
        
    case 'DELETE':
        // Delete user
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id)) {
            $query = "DELETE FROM users WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $data->id);
            
            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "User deleted successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to delete user."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete user. Data is incomplete."));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
