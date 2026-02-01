import { useState, useEffect } from 'react';

interface EventData {
    id?: number;
    title: string;
    description: string;
    date: string;
    location: string;
    capacity: number;
    price: number;
    image_url: string;
}

export function AdminEventsPage() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
    const [formData, setFormData] = useState<EventData>({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: 0,
        price: 0,
        image_url: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await fetch('/api/events/read.php');
        const data = await response.json();
        if (data.records) {
            setEvents(data.records);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === 'capacity' || name === 'price' ? Number(value) : value 
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingEvent ? '/api/events/create.php' : '/api/events/create.php';
            const method = editingEvent ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEvent ? { ...formData, id: editingEvent.id } : formData)
            });
            
            const result = await response.json();
            console.log('Event creation result:', result);
            
            if (response.ok) {
                fetchEvents();
                resetForm();
                alert('Event created successfully!');
            } else {
                alert(`Failed to create event: ${result.message || 'Unknown error'}`);
            }
        } catch (error: any) {
            console.error("Error saving event", error);
            alert(`Error: ${error?.message || 'Unknown error'}`);
        }
        setLoading(false);
    };

    const handleEdit = (event: EventData) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            capacity: event.capacity,
            price: event.price,
            image_url: event.image_url
        });
    };

    const resetForm = () => {
        setFormData({ 
            title: '', 
            description: '', 
            date: '', 
            location: '', 
            capacity: 0, 
            price: 0,
            image_url: '' 
        });
        setEditingEvent(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await fetch('/api/events/delete.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] pt-14 sm:pt-16 md:pt-18 lg:pt-20">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 font-impact">EVENT OPERATIONS</h1>
                    <a 
                        href="/admin" 
                        className="inline-flex items-center text-gray-400 hover:text-white text-sm sm:text-base font-medium transition-colors touch-target"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </a>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Form */}
                    <div className="xl:col-span-1">
                        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-200">
                                {editingEvent ? 'Edit Event' : 'Create Event'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Event Title</label>
                                    <input 
                                        name="title" 
                                        placeholder="Enter event title" 
                                        value={formData.title} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                    <textarea 
                                        name="description" 
                                        placeholder="Enter event description" 
                                        value={formData.description} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors min-h-[100px] resize-none" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Date & Time</label>
                                    <input 
                                        type="datetime-local" 
                                        name="date" 
                                        value={formData.date} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                                    <input 
                                        name="location" 
                                        placeholder="Enter event location" 
                                        value={formData.location} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Capacity</label>
                                    <input 
                                        type="number" 
                                        name="capacity" 
                                        placeholder="Enter capacity" 
                                        value={formData.capacity} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                        min="1"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Price (₹)</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        placeholder="Enter event price" 
                                        value={formData.price} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                        required 
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                 
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Image URL (Optional)</label>
                                    <input 
                                        name="image_url" 
                                        placeholder="Enter image URL" 
                                        value={formData.image_url} 
                                        onChange={handleChange} 
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-base focus:border-red-500 focus:outline-none transition-colors" 
                                    />
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={loading} 
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        {loading ? 'Processing...' : (editingEvent ? 'UPDATE EVENT' : 'CREATE EVENT')}
                                    </button>
                                    {editingEvent && (
                                        <button 
                                            type="button" 
                                            onClick={resetForm}
                                            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors touch-target text-sm sm:text-base"
                                        >
                                            CANCEL
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Events List */}
                    <div className="xl:col-span-2">
                        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-red-900/30 card">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-200">Active Events</h2>
                                <div className="text-xs sm:text-sm text-gray-400">
                                    {events.length} {events.length === 1 ? 'Event' : 'Events'}
                                </div>
                            </div>
                            
                            <div className="space-y-3 sm:space-y-4">
                                {events.map((event) => (
                                    <div key={event.id} className="bg-gray-800 p-4 sm:p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-base sm:text-lg lg:text-xl text-red-400 mb-2 truncate">{event.title}</h3>
                                                <div className="space-y-1 mb-3">
                                                    <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {event.location}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {new Date(event.date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Capacity: {event.capacity}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1l-1 1m-1-1h1" />
                                                        </svg>
                                                        Price: ₹{event.price}
                                                    </p>
                                                </div>
                                                {event.description && (
                                                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-3">{event.description}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-row lg:flex-col gap-2">
                                                <button 
                                                    onClick={() => handleEdit(event)} 
                                                    className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors touch-target"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2h2.828l-8.586-8.586z" />
                                                    </svg>
                                                    EDIT
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(event.id!)} 
                                                    className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors touch-target"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {events.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-lg mb-2">No events found</div>
                                        <p className="text-gray-500 text-sm">Create your first event to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
