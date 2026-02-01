import { motion } from 'motion/react';
import { useState } from 'react';
import ConfidentialFolder from './ConfidentialFolder';

export function SignupSection() {
  const [formData, setFormData] = useState({
    name: '',
    collegeId: '',
    email: '',
    progress: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="signup" className="relative py-20 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Optional Header or Context if needed, or keeping it clean */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <ConfidentialFolder />
        </motion.div>
      </div>
    </section>
  );
}