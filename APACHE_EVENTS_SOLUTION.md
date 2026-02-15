# 🚀 Complete Solution: Apache & Events Fix

## 🔧 **Step-by-Step Solution**

### **1. Apache Virtual Host Fix**
The Apache virtual host configuration isn't loading properly. Here's how to fix it:

#### **Option A: Use XAMPP Control Panel (Recommended)**
1. Open XAMPP Control Panel
2. Stop Apache service
3. Start Apache service
4. Test: `http://localhost:80/api/events/read.php`

#### **Option B: Manual Apache Restart**
```powershell
# Stop Apache
sc stop apache2

# Start Apache  
sc start apache2
```

#### **Option C: Alternative - Use Different Port**
If Apache on port 80 isn't working:
1. Change Apache to port 8080 in XAMPP config
2. Update vite.config.ts proxy target to `http://localhost:8080`

### **2. Vite Proxy Configuration**
The Vite proxy is already configured to forward `/api` requests to `http://localhost:80`.

**Current vite.config.ts:**
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:80',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### **3. Events API Fix**
The EventsSection now uses the correct API endpoint:
```javascript
const response = await fetch('/api/events/read.php');
```

### **4. Database Verification**
✅ Database contains 4 events:
- rc car racing (ID: 5)
- hackathon (ID: 4)  
- bgmibash (ID: 3)
- beta gaming bgmi (ID: 2)

### **5. Testing Steps**

#### **Test 1: API Directly**
```powershell
C:\xampp\php\php.exe -r "echo file_get_contents('http://localhost:80/api/events/read.php');"
```

#### **Test 2: Browser Test**
1. Open browser
2. Go to: `http://localhost:80/api/events/read.php`
3. Should see JSON with events data

#### **Test 3: React App Test**
1. Restart Vite dev server: `npm run dev`
2. Open: `http://localhost:5173`
3. Check Events section - should show database events

### **6. Troubleshooting**

#### **If API Still Returns 404:**
1. Check if Apache is running: `netstat -an | findstr :80`
2. Check Apache error logs: `C:\xampp\apache\logs\error.log`
3. Verify virtual host config: `C:\xampp\apache\conf\extra\strangerthings.conf`

#### **If Events Still Not Showing:**
1. Check browser console for API errors
2. Verify database connection: `C:\xampp\htdocs\strangerthings2026\public\api\config\database.php`
3. Check API response format in browser

### **7. Alternative Solution (If Apache Issues Persist)**
Create a simple PHP file in public folder:
```php
// public/events-direct.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once 'api/config/database.php';
$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM events ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();

$events = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $events[] = $row;
}

echo json_encode(["records" => $events]);
```

Then update EventsSection to use `/events-direct.php`

### **8. Final Verification**
After applying fixes:
1. ✅ Apache should serve API endpoints
2. ✅ Vite proxy should forward requests
3. ✅ Events page should show database events
4. ✅ Event creation/management should work

## 🎯 **Expected Result**
Your events page should now display:
- rc car racing
- hackathon  
- bgmibash
- beta gaming bgmi

Instead of the 4 hardcoded fallback events.

## 📞 **If Still Not Working**
1. Restart entire XAMPP
2. Clear browser cache
3. Check for conflicting services on port 80
4. Try different port (8080, 8081)
