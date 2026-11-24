import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Rocket } from 'lucide-react';

export default function MissionsSection({ t }) {
  const icons = [<BookOpen size={24} />, <Users size={24} />, <Lightbulb size={24} />, <Rocket size={24} />];
  const missionsList = [t.missions.m1, t.missions.m2, t.missions.m3, t.missions.m4];

  return (
    <section id="missions" className="py-28 bg-navy text-white px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black font-montserrat text-softCyan">{t.missions.title}</h2>
          <p className="text-steelSlate text-sm sm:text-base">{t.missions.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-3xl bg-royal/10 border border-royal/20 space-y-6 overflow-hidden group hover:border-softCyan/50 transition-all duration-300"
            >
              {/* Grand numéro d'arrière-plan */}
              <span className="absolute top-2 right-4 text-7xl font-black text-white/5 font-montserrat select-none group-hover:text-softCyan/10 transition-colors">
                {item.num}
              </span>

              <div className="w-12 h-12 rounded-2xl bg-royal/20 text-softCyan flex items-center justify-center group-hover:bg-energeticOrange group-hover:text-white transition-colors duration-300">
                {icons[idx]}
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-bold font-montserrat text-white group-hover:text-softCyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-steelSlate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}