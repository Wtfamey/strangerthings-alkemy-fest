import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
}

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTypeName: string;
  eventTypeColor: string;
  events: Event[];
  onRegister: (eventId: number) => void;
}

export function EventDetailModal({ 
  isOpen, 
  onClose, 
  eventTypeName, 
  eventTypeColor, 
  events, 
  onRegister 
}: EventDetailModalProps) {
  if (!isOpen) return null;

  const getAccentColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'purple': 'border-purple-500 text-purple-400 bg-purple-500/10',
      'green': 'border-green-500 text-green-400 bg-green-500/10',
      'red': 'border-red-500 text-red-400 bg-red-500/10',
      'cyan': 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      'orange': 'border-orange-500 text-orange-400 bg-orange-500/10',
      'pink': 'border-pink-500 text-pink-400 bg-pink-500/10',
    };
    return colorMap[color] || 'border-gray-500 text-gray-400 bg-gray-500/10';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const accentColor = getAccentColor(eventTypeColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 border rounded-xl overflow-hidden"
        style={{ borderColor: eventTypeColor === 'purple' ? '#a855f7' : eventTypeColor === 'green' ? '#22c55e' : eventTypeColor === 'red' ? '#ef4444' : eventTypeColor === 'cyan' ? '#06b6d4' : '#f97316' }}
      >
        {/* Header */}
        <div className={`p-6 border-b ${accentColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{eventTypeName}</h2>
              <p className="text-gray-400">Choose an event to register for</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No events available yet</div>
              <p className="text-gray-400">Check back later for new events in this category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-lg p-6 ${accentColor} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                      
                      {/* Event Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Users className="w-4 h-4" />
                          <span>{event.capacity} participants</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-white">₹{event.price}</span>
                        <span className="text-gray-400 text-sm">per person</span>
                      </div>
                    </div>

                    {/* Register Button */}
                    <div className="ml-6">
                      <button
                        onClick={() => onRegister(event.id)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                      >
                        Register
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
