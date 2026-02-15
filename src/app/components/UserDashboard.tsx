import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Calendar, MapPin, Users, Clock, X, Trophy, Music, Gamepad2, Code, Dumbbell } from 'lucide-react';

interface RegisteredEvent {
  id: number;
  event_id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  event_type_name: string;
  event_type_color: string;
  registration_date: string;
  status: string;
}

const eventIcons: { [key: string]: any } = {
  'Technical': Code,
  'Esports': Gamepad2,
  'Sports': Dumbbell,
  'Cultural': Music,
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export function UserDashboard() {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [unregistering, setUnregistering] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchRegisteredEvents();
    }
  }, [user]);

  const fetchRegisteredEvents = async () => {
    if (!user) {
      console.log('UserDashboard: No user logged in, cannot fetch registrations');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/registrations/read.php?user_id=${user.id}`);
      const data = await response.json();
      
      if (data.success && data.records) {
        // Events are already filtered by user_id in the API
        setRegisteredEvents(data.records);
      } else {
        setRegisteredEvents([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registered events:', error);
      toast.error('Failed to load registrations', {
        description: 'Please try again later.',
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleUnregister = async (eventId: number) => {
    if (!confirm('Are you sure you want to unregister from this event?')) {
      return;
    }

    setUnregistering(eventId);
    try {
      const response = await fetch('/api/registrations/delete.php', {
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
      
      if (data.success) {
        toast.success('Successfully unregistered from event', {
          description: 'You have been removed from the event.',
          duration: 3000,
        });
        fetchRegisteredEvents(); // Refresh the list
      } else {
        toast.error('Failed to unregister', {
          description: data.message || 'Please try again later.',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error unregistering:', error);
      toast.error('Failed to unregister', {
        description: 'Please try again later.',
        duration: 3000,
      });
    } finally {
      setUnregistering(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getEventIcon = (eventTypeName: string) => {
    return eventIcons[eventTypeName] || Calendar;
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-red-500 font-impact">
            USER DASHBOARD
          </h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-gray-300">
            Welcome, {user?.full_name || 'User'}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 border-t-transparent"></div>
          </div>
        ) : registeredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-300 mb-2">No Registered Events</h2>
              <p className="text-gray-400">You haven't registered for any events yet.</p>
              <p className="text-gray-500 text-sm mt-4">
                Browse our events and register for upcoming competitions!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-6">Your Registered Events</h2>
            </motion.div>

            {registeredEvents.map((event, index) => {
              const EventIcon = getEventIcon(event.event_type_name);
              const statusColor = getStatusColor(event.status);
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-lg ${event.event_type_color === 'red' ? 'bg-red-900' : event.event_type_color === 'green' ? 'bg-green-900' : event.event_type_color === 'orange' ? 'bg-orange-900' : event.event_type_color === 'cyan' ? 'bg-cyan-900' : 'bg-purple-900'}`}>
                          <EventIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{event.capacity} spots</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold text-red-400">${event.price}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              {event.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {event.capacity} participants
                      </div>
                    </div>

                    {/* Unregister Button */}
                    {isUpcoming && (
                      <button
                        onClick={() => handleUnregister(event.event_id)}
                        disabled={unregistering === event.event_id}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {unregistering === event.event_id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Unregistering...
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            Unregister
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
