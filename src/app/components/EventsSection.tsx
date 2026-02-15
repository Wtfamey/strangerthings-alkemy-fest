import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArcadeEventCard } from './ArcadeEventCard';
import { EventDetailModal } from './EventDetailModal';
import { Code, Music, Gamepad2, Trophy } from 'lucide-react';

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

interface EventCategory {
  id: string;
  title: string;
  subtitle: string;
  color: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'cyan';
  imageSrc: string;
  events: EventData[];
}

export function EventsSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [version, setVersion] = useState(Date.now()); // Force re-render

  const handleRegister = async (eventId: number) => {
    if (!user) {
      toast.error('You must be logged in to register!', {
        description: 'Redirecting to login page...',
        duration: 3000,
      });
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    try {
      const response = await fetch('/api/registrations/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          event_id: eventId
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Successfully registered! Welcome to the party.');
        setIsModalOpen(false); // Close modal after successful registration
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Connection failed. Are you connected to the Upside Down?');
    }
  };

  const handleViewEvents = (eventType: any) => {
    setSelectedEventType(eventType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventType(null);
  };

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        console.log("Fetching event types from BYPASS API...");
        // Use bypass API to completely eliminate any caching or routing issues
        const timestamp = Date.now();
        const response = await fetch(`/api/bypass.php?v=${timestamp}&t=${timestamp}`);
        const data = await response.json();
        console.log("Bypass API response:", data);
        if (data.success && data.data) {
          const mappedEvents = data.data.map((eventType: any, index: number) => {
            const icons = [Code, Music, Gamepad2, Trophy];
            
            // Force specific image paths based on event type name
            let imageSrc = '/arcade-purple.png'; // default
            let accentColor = 'purple'; // default
            
            if (eventType.name === 'Technical') {
              imageSrc = '/arcade-red.png';
              accentColor = 'red';
            } else if (eventType.name === 'Esports') {
              imageSrc = '/arcade-green.png';
              accentColor = 'green';
            } else if (eventType.name === 'Sports') {
              imageSrc = '/arcade-orange.png';
              accentColor = 'orange';
            } else if (eventType.name === 'Cultural') {
              imageSrc = '/arcade-cyan.png';
              accentColor = 'cyan';
            }
            
            return {
              id: eventType.id,
              title: eventType.name.toUpperCase() + (eventType.subtitle ? ' ' + eventType.subtitle : ''),
              subtitle: eventType.subtitle || '',
              icon: icons[index % icons.length],
              color: accentColor as 'purple' | 'pink' | 'red' | 'green' | 'cyan' | 'orange',
              imageSrc: imageSrc,
              stats: [
                { label: 'EVENTS', value: eventType.event_count.toString() },
              ],
              events: eventType.events || []
            };
          });
          setEvents(mappedEvents);
          console.log("Bypass API loaded:", mappedEvents.length, "event types");
        } else {
          console.error("Failed to load event types from bypass API:", data);
        }
      } catch (error) {
        console.error('Failed to fetch event types from bypass API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventTypes();
  }, []);

  // Only show events from database, no static fallback to avoid duplication
  const displayEvents = events;

  return (
    <section id="events" className="relative pt-0 pb-12 px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-2 relative flex flex-col items-center"
        >
          {/* Top Neon Bar - Styled like Hero */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80%", maxWidth: "600px" }} // Adjusted width mobile/desktop
            transition={{ delay: 0.2, duration: 1.5 }}
            className="h-1.5 md:h-2 bg-transparent border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5),0_0_20px_rgba(239,68,68,0.3)] rounded-full mb-0"
          ></motion.div>

          {/* EVENTS - High Fidelity SVG Title */}
          <div className="relative z-10 w-full max-w-3xl px-4 select-none -mt-4 md:-mt-12">
            <svg viewBox="0 0 800 200" className="w-full h-auto overflow-visible">
              <defs>
                <filter id="events-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Main Hollow Text with Deep Glow */}
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="2"
                  filter="url(#events-glow)"
                  style={{
                    fontWeight: 900,
                    fontSize: '60px',
                    fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                  }}
                  className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                >
                  EVENTS
                </text>

                {/* Inner Bright Stroke for "Tube" effect */}
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="transparent"
                  stroke="#fca5a5"
                  strokeWidth="0.8"
                  style={{
                    fontWeight: 900,
                    fontSize: '60px',
                    fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                  }}
                >
                  EVENTS
                </text>

                {/* Flickering Overlay for Realistic Neon Buzz */}
                <motion.text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="2"
                  filter="url(#events-glow)"
                  style={{
                    fontWeight: 900,
                    fontSize: '60px',
                    fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                  }}
                  animate={{
                    opacity: [0.3, 0.4, 0.3, 0.5, 0.3],
                    strokeWidth: [3, 3.5, 3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  EVENTS
                </motion.text>
              </motion.g>
            </svg>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4">
          {displayEvents.map((event, index) => {
            return (
              <div key={index} className="w-full">
                <ArcadeEventCard
                  title={event.title}
                  subtitle={event.subtitle}
                  accentColor={event.color as 'purple' | 'pink' | 'red' | 'green' | 'cyan' | 'orange'}
                  imageSrc={event.imageSrc}
                  stats={event.stats}
                  onRegister={() => handleViewEvents(event)}
                  index={index}
                  icon={event.icon}
                />
              </div>
            )
          })}
        </div>
        
        {/* Event Detail Modal */}
        <EventDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          eventTypeName={selectedEventType?.title || ''}
          eventTypeColor={selectedEventType?.color || ''}
          events={selectedEventType?.events || []}
          onRegister={handleRegister}
        />
      </div>
    </section>
  );
}