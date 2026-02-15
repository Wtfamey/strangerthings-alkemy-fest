import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { Users, Calendar, Clock, MapPin, DollarSign, Trophy, X } from 'lucide-react';
import { ArcadeEventCard } from '../components/ArcadeEventCard';
import arcadeBg from '../../assets/arcade_no_bg.png';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  event_type_name: string;
  event_type_color: string;
}

export function EventDetailsPage() {
  const { user } = useAuth();
  const { eventTypeId } = useParams<{ eventTypeId: string }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events/read.php?event_type_id=${eventTypeId}`);
        const data = await response.json();
        
        if (data.records) {
          // Get event type info for color theme
          const eventTypeResponse = await fetch(`/api/event_types/read.php?id=${eventTypeId}`);
          const eventTypeData = await eventTypeResponse.json();
          const eventType = eventTypeData.data?.[0] || {};
          
          const eventsWithType = data.records.map((event: any) => ({
            ...event,
            event_type_name: eventType.name || 'Unknown',
            event_type_color: eventType.color || 'purple'
          }));
          
          setEvents(eventsWithType);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventTypeId]);

  const handleRegister = async (eventId: number) => {
    if (!user) {
      toast.error('You must be logged in to register!', {
        description: 'Redirecting to login page...',
        duration: 3000,
      });
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    setRegistering(eventId);
    
    try {
      const response = await fetch('/api/registrations/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user_id: user.id,
          event_id: eventId
        })
      });

      const result = await response.json();
      
      if (response.ok && result.message) {
        toast.success('Registration successful!', {
          description: 'You have been registered for this event.',
          duration: 3000,
        });
      } else {
        // Handle specific error messages
        let errorMessage = result.message || 'Registration failed';
        let errorDescription = '';
        
        if (errorMessage.includes('closed')) {
          errorDescription = 'Registration for this event has been closed by the administrator.';
        } else if (errorMessage.includes('full')) {
          errorDescription = 'This event has reached maximum capacity.';
        } else if (errorMessage.includes('already registered')) {
          errorDescription = 'You are already registered for this event.';
        }
        
        toast.error(errorMessage, {
          description: errorDescription || 'Please try again later.',
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error('Registration failed', {
        description: 'Please try again later.',
        duration: 3000,
      });
    } finally {
      setRegistering(null);
    }
  };

  const getEventTypeColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_0_10px_rgba(168,85,247,0.5)]',
      red: 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4),inset_0_0_10px_rgba(239,68,68,0.5)]',
      green: 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4),inset_0_0_10px_rgba(34,197,94,0.5)]',
      orange: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4),inset_0_0_10px_rgba(249,115,22,0.5)]',
      cyan: 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4),inset_0_0_10px_rgba(6,182,212,0.5)]'
    };
    
    return colorMap[color] || colorMap.purple;
  };

  const getEventTypeGlow = (color: string) => {
    const glowMap: { [key: string]: string } = {
      purple: 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
      red: 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]',
      green: 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]',
      orange: 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]',
      cyan: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
    };
    
    return glowMap[color] || glowMap.purple;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="text-2xl font-bold mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  const eventType = events[0]?.event_type_color || 'purple';
  const borderColor = getEventTypeColor(eventType);
  const textColor = getEventTypeGlow(eventType);

  return (
    <div className="min-h-screen relative">
      {/* Background with arcade theme */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${arcadeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="fixed inset-0 bg-black/60"></div>
        
        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <div className="bg-black/80 backdrop-blur-sm border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <motion.div
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  </button>
                  
                  <h1 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">
                    <span className={`${textColor}`}>
                      {events[0]?.event_type_name || 'Events'}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 backdrop-blur-md rounded-xl border-2 p-8"
              style={{ borderColor }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Events List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <h2 className={`text-2xl font-bold mb-6 uppercase tracking-wider ${textColor}`}>
                    Available Events
                  </h2>
                  
                  {events.map((event, index) => (
                    <ArcadeEventCard
                      key={event.id}
                      title={event.title}
                      subtitle={event.event_type_name}
                      accentColor={event.event_type_color as 'purple' | 'pink' | 'red' | 'green' | 'cyan' | 'orange'}
                      imageSrc={`/arcade-${event.event_type_color}.png`}
                      stats={[
                        { label: 'DATE', value: new Date(event.date).toLocaleDateString() },
                        { label: 'TIME', value: new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                        { label: 'LOCATION', value: event.location },
                        { label: 'CAPACITY', value: `${event.capacity} spots` },
                        { label: 'PRICE', value: `$${event.price}` }
                      ]}
                      onRegister={() => handleRegister(event.id)}
                      index={index}
                      icon={Calendar}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
