import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { User } from 'lucide-react';

export function ProfileSection() {
  // Mock user data
  const userData = {
    name: 'Jane Hawkins',
    id: 'HKN-2024-1184',
    registeredEvents: [
      'Code Expedition',
      'Mind Flayers',
      'Hawkins Idol'
    ]
  };

  const teamMembers = [
    { name: 'Mike Wheeler', role: 'Team Lead' },
    { name: 'Dustin Henderson', role: 'Developer' },
    { name: 'Lucas Sinclair', role: 'Designer' }
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="p-8 border-2 border-red-900 bg-black/80 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full border-2 border-red-600 flex items-center justify-center bg-red-950/30">
                  <User className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    PROFILE
                  </h3>
                  <p className="text-sm text-gray-400">Participant ID</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-red-400 tracking-wider block mb-1">NAME</label>
                  <p className="text-white font-bold">{userData.name}</p>
                </div>
                <div>
                  <label className="text-xs text-red-400 tracking-wider block mb-1">ID NUMBER</label>
                  <p className="text-white">{userData.id}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-red-400 tracking-wider mb-3">MY REGISTERED EVENTS</h4>
                <div className="space-y-2">
                  {userData.registeredEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-3 border border-red-900/50 bg-red-950/20 text-sm"
                    >
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR Code & Team */}
            <div className="space-y-6">
              {/* QR Code Card */}
              <div className="p-8 border-2 border-cyan-900 bg-black/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wider text-center">
                  ACCESS KEY
                </h3>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white">
                    <QRCodeSVG
                      value={`ALKEMY-FEST-2026-${userData.id}`}
                      size={180}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400">
                  Scan this code at event venues
                </p>
              </div>

              {/* Team Management Card */}
              <div className="p-6 border-2 border-purple-900 bg-black/80 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-purple-400 mb-4 tracking-wider">
                  TEAM MANAGEMENT
                </h3>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-purple-900/50 bg-purple-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-purple-600 flex items-center justify-center bg-purple-950/50">
                          <User className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
