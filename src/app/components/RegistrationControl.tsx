import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Power, PowerOff, Users, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  registration_open: boolean;
  registered_count?: number;
}

interface RegistrationControlProps {
  events: Event[];
  onEventUpdate?: () => void;
}

export function RegistrationControl({ events, onEventUpdate }: RegistrationControlProps) {
  const [updating, setUpdating] = useState<number | null>(null);
  const [updatingAll, setUpdatingAll] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    full: 0
  });

  useEffect(() => {
    // Calculate statistics
    const total = events.length;
    const open = events.filter(e => e.registration_open).length;
    const closed = events.filter(e => !e.registration_open).length;
    const full = events.filter(e => (e.registered_count || 0) >= e.capacity).length;
    
    setStats({ total, open, closed, full });
  }, [events]);

  const toggleEventRegistration = async (eventId: number) => {
    setUpdating(eventId);
    
    try {
      const response = await fetch('/api/events/toggle_registration.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ event_id: eventId })
      });

      const result = await response.json();
      
      if (result.success || result.message) {
        const event = events.find(e => e.id === eventId);
        const newStatus = result.registration_open;
        
        toast.success(`Event registration ${newStatus ? 'opened' : 'closed'}!`, {
          description: `${event?.title} registration is now ${newStatus ? 'open' : 'closed'}.`,
          duration: 3000,
        });
        
        if (onEventUpdate) {
          onEventUpdate();
        }
      } else {
        toast.error('Failed to update registration status', {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to update registration status', {
        description: 'Please try again later.',
        duration: 3000,
      });
    } finally {
      setUpdating(null);
    }
  };

  const toggleAllRegistrations = async () => {
    setUpdatingAll(true);
    
    try {
      const response = await fetch('/api/events/toggle_registration.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ action: "toggle_all" })
      });

      const result = await response.json();
      
      if (result.success || result.message) {
        const willOpen = stats.closed > 0; // If some are closed, we'll open all
        
        toast.success(`All events registration ${willOpen ? 'opened' : 'closed'}!`, {
          description: `${result.total_events} events updated. ${result.open_events} now open for registration.`,
          duration: 3000,
        });
        
        if (onEventUpdate) {
          onEventUpdate();
        }
      } else {
        toast.error('Failed to update all registrations', {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to update all registrations', {
        description: 'Please try again later.',
        duration: 3000,
      });
    } finally {
      setUpdatingAll(false);
    }
  };

  const getRegistrationStatus = (event: Event) => {
    if ((event.registered_count || 0) >= event.capacity) {
      return { status: 'full', color: 'text-red-400', icon: XCircle, text: 'FULL' };
    }
    if (event.registration_open) {
      return { status: 'open', color: 'text-green-400', icon: CheckCircle, text: 'OPEN' };
    }
    return { status: 'closed', color: 'text-orange-400', icon: PowerOff, text: 'CLOSED' };
  };

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-red-400">Registration Control</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAllRegistrations}
            disabled={updatingAll}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              updatingAll 
                ? 'bg-gray-600 cursor-not-allowed' 
                : stats.closed > 0
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-orange-600 hover:bg-orange-700'
            } text-white`}
          >
            {updatingAll ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white border-t-transparent"></div>
                <span>Updating...</span>
              </div>
            ) : stats.closed > 0 ? (
              <div className="flex items-center gap-2">
                <Power className="w-4 h-4" />
                <span>Open All Registrations</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <PowerOff className="w-4 h-4" />
                <span>Close All Registrations</span>
              </div>
            )}
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/40 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-gray-400">Total Events</div>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">{stats.open}</div>
                <div className="text-sm text-gray-400">Open</div>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-4 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <PowerOff className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-orange-400">{stats.closed}</div>
                <div className="text-sm text-gray-400">Closed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-4 border border-red-500/30">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">{stats.full}</div>
                <div className="text-sm text-gray-400">Full</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-500/30 p-6"
      >
        <h3 className="text-xl font-bold text-red-400 mb-4">Individual Event Control</h3>
        
        <div className="space-y-3">
          {events.map((event, index) => {
            const statusInfo = getRegistrationStatus(event);
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-black/40 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                      <div className={`flex items-center gap-2 ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{statusInfo.text}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.registered_count || 0}/{event.capacity}</span>
                      </div>
                      <span className="text-red-400">${event.price}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleEventRegistration(event.id)}
                    disabled={updating === event.id || statusInfo.status === 'full'}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      updating === event.id
                        ? 'bg-gray-600 cursor-not-allowed'
                        : statusInfo.status === 'full'
                          ? 'bg-gray-700 cursor-not-allowed opacity-50'
                          : event.registration_open
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-orange-600 hover:bg-orange-700'
                    } text-white`}
                  >
                    {updating === event.id ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white border-t-transparent"></div>
                        <span>Updating...</span>
                      </div>
                    ) : statusInfo.status === 'full' ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        <span>Full</span>
                      </div>
                    ) : event.registration_open ? (
                      <div className="flex items-center gap-2">
                        <PowerOff className="w-3 h-3" />
                        <span>Close</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Power className="w-3 h-3" />
                        <span>Open</span>
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
