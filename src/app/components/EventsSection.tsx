import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArcadeCabinet from './ArcadeCabinet';
import { Music, Code, Rocket, Mic, Laptop, Trophy, Gamepad2, Brain, Bot, Flower2, LucideIcon, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

export function EventsSection() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      const response = await fetch('/strangerthings2026/public/api/registrations/create.php', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          event_id: eventId
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Successfully registered! Welcome to the party.');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Are you connected to the Upside Down?');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/strangerthings2026/public/api/events/read.php');
        const data = await response.json();
        
        if (data.records) {
          const mappedEvents = data.records.map((event: EventData, index: number) => {
            const colors: ('red' | 'blue' | 'green' | 'purple' | 'orange')[] = ['blue', 'purple', 'green', 'red'];
            const icons = [Code, Music, Gamepad2, Trophy];

            return {
              id: event.id,
              title: event.title,
              subtitle: event.location, // Mapping location to subtitle
              icon: icons[index % icons.length],
              color: colors[index % colors.length],
              stats: [
                { label: 'DATE', value: new Date(event.date).toLocaleDateString() },
                { label: 'CAPACITY', value: event.capacity.toString() },
              ]
            };
          });
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fallback to static data if no events in DB yet (or initial load) to keep design looking good
  const displayEvents = events.length > 0 ? events : [
    {
      title: 'TECHNICAL QUESTS',
      subtitle: '(THE LAB)',
      icon: Code,
      color: 'blue' as const,
      stats: [
        { label: 'QUESTS', value: '15+' },
        { label: 'TREASURY', value: '₹40K+' },
      ]
    },
    {
      title: 'CULTURAL FESTIVITIES',
      subtitle: "(SNOW BALL '84)",
      icon: Music,
      color: 'purple' as const,
      stats: [
        { label: 'EVENTS', value: '12+' },
        { label: 'TREASURY', value: '₹30K+' },
      ]
    },
    {
      title: 'E-SPORTS TOURNAMENT',
      subtitle: '(THE ARCADE)',
      icon: Gamepad2,
      color: 'green' as const,
      stats: [
        { label: 'BATTLES', value: '9+' },
        { label: 'TREASURY', value: '₹30K+' },
      ]
    },
    {
      title: 'SPORTS LEGENDS',
      subtitle: '(HAWKINS TIGERS)',
      icon: Trophy,
      color: 'red' as const,
      stats: [
        { label: 'TRIALS', value: '8+' },
        { label: 'TREASURY', value: '₹30K+' },
      ]
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {displayEvents.map((event, index) => {
            const glowColor = event.color === 'blue' ? 'rgba(59,130,246,0.5)' :
              event.color === 'green' ? 'rgba(34,197,94,0.5)' :
                event.color === 'purple' ? 'rgba(168,85,247,0.5)' :
                  'rgba(220,38,38,0.5)';
            const borderColor = event.color === 'blue' ? 'border-blue-500/50' :
              event.color === 'green' ? 'border-green-500/50' :
                event.color === 'purple' ? 'border-purple-500/50' :
                  'border-red-500/50';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`w-full max-w-[320px] p-0 rounded-xl border-2 ${borderColor} shadow-[0_0_20px_${glowColor},inset_0_0_10px_${glowColor}] hover:scale-105 transition-all duration-300 bg-black/40 backdrop-blur-sm group`}
              >
                <ArcadeCabinet
                  title={event.title}
                  subtitle={event.subtitle}
                  icon={event.icon}
                  color={event.color}
                  stats={event.stats}
                  onRegister={() => handleRegister(event.id || 0)}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}