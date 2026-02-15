<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING SESSION AUTHENTICATION ===\n\n";

// Test 1: Check if session is working
echo "1. Testing session functionality...\n";
session_start();

// Test 2: Set a session variable
$_SESSION['test'] = 'session_test_value';
echo "✅ Session variable set: test = " . $_SESSION['test'] . "\n";

// Test 3: Verify session variable
echo "2. Verifying session variable...\n";
echo "Current session test: " . ($_SESSION['test'] ?? 'Not set') . "\n";

// Test 4: Check if session persists across requests
echo "3. Session persistence test:\n";
echo "Session ID: " . session_id() . "\n";
echo "Session name: " . session_name() . "\n";

// Test 5: Check if user session data exists
echo "4. Checking user session data...\n";
if (isset($_SESSION['user_id'])) {
    echo "✅ User session found: ID=" . $_SESSION['user_id'] . "\n";
    echo "User name: " . ($_SESSION['full_name'] ?? 'Not set') . "\n";
    echo "User email: " . ($_SESSION['email'] ?? 'Not set') . "\n";
    echo "User role: " . ($_SESSION['role'] ?? 'Not set') . "\n";
} else {
    echo "❌ No user session found\n";
}

echo "\n=== SESSION TEST COMPLETE ===\n";
?>
