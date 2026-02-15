-- Event Types Table
CREATE TABLE IF NOT EXISTS event_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subtitle VARCHAR(200),
    color VARCHAR(20) NOT NULL,
    image_src VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert the 4 main event types
INSERT INTO event_types (name, subtitle, color, image_src, description) VALUES
('Technical', '(THE LAB)', 'purple', '/arcade-purple.png', 'Technical events including hackathons, coding competitions, and workshops'),
('Esports', '(THE ARCADE)', 'green', '/arcade-green.png', 'Gaming tournaments and esports competitions'),
('Sports', '(HAWKINS TIGERS)', 'red', '/arcade-red.png', 'Sports events and athletic competitions'),
('Cultural', "(SNOW BALL '84)", 'cyan', '/arcade-cyan.png', 'Cultural events including music, arts, and performances');

-- Update Events Table to include event_type_id
ALTER TABLE events 
ADD COLUMN event_type_id INT NOT NULL DEFAULT 1 AFTER id,
ADD FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE;

-- Update existing events to have proper event_type_id
UPDATE events SET event_type_id = 1 WHERE title LIKE '%Technical%' OR title LIKE '%Code%' OR title LIKE '%Hack%';
UPDATE events SET event_type_id = 2 WHERE title LIKE '%Game%' OR title LIKE '%Esport%' OR title LIKE '%Tournament%';
UPDATE events SET event_type_id = 3 WHERE title LIKE '%Sport%' OR title LIKE '%Athletic%' OR title LIKE '%Basketball%' OR title LIKE '%Football%';
UPDATE events SET event_type_id = 4 WHERE title LIKE '%Cultural%' OR title LIKE '%Music%' OR title LIKE '%Art%' OR title LIKE '%Drama%';
