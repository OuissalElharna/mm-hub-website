import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function ObjectiveSection({ t }) {
  return (
    <section className="py-24 bg-white text-navy px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-softCyan/30 text-royal text-xs font-black uppercase tracking-wider"
        >
          <Target size={16} className="text-energeticOrange" />
          <span>Vision & Alignment</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black font-montserrat text-navy"
        >
          {t.objective.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-steelSlate/90 text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto font-normal"
        >
          {t.objective.desc}
        </motion.p>
      </div>
    </section>
  );
}