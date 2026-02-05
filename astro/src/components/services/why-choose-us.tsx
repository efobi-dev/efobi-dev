import { motion } from "motion/react";

const benefits = [
  {
    number: "01",
    title: "AI Pre-Processing",
    description:
      "Proprietary automation handles data structuring, format conversions, and anomaly detection. What used to take hours now takes minutes.",
  },
  {
    number: "02",
    title: "Nigerian Expertise",
    description:
      "English-fluent professionals with domain knowledge. Data entry specialists, VAs, and industry experts who understand context, not just keystrokes.",
  },
  {
    number: "03",
    title: "Continuous Operation",
    description:
      "Round-the-clock shifts ensure your projects never stall. Submit work at 5 PM Lagos, wake up to completed deliverables.",
  },
  {
    number: "04",
    title: "Scalable Instantly",
    description:
      "Need 3 workers today, 10 tomorrow? We flex with your demand. No recruitment overhead, no long-term commitments.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 md:py-40 bg-accent/10 overflow-hidden">
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section header - full width with line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="h-px bg-primary flex-1" />
            <span className="text-sm font-mono tracking-wider text-primary uppercase">
              Our Advantage
            </span>
            <div className="h-px bg-primary flex-1" />
          </div>
          
          <h2 className="text-center text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter text-secondary-foreground">
            Why We're Different
          </h2>
        </motion.div>

        {/* Benefits - large number + text layout */}
        <div className="space-y-16 md:space-y-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`grid md:grid-cols-12 gap-8 items-center ${
                index % 2 === 0 ? '' : 'md:grid-flow-dense'
              }`}>
                
                {/* Number - large decorative */}
                <div className={`md:col-span-4 ${index % 2 === 0 ? '' : 'md:col-start-9'}`}>
                  <div className="relative">
                    <div className="text-[12rem] md:text-[16rem] font-black leading-none text-primary/10 select-none">
                      {benefit.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:col-start-6' : 'md:col-start-1'}`}>
                  <div className="space-y-6 p-8 border-l-4 border-primary bg-card/50 backdrop-blur-sm group-hover:border-primary group-hover:bg-card transition-all duration-300">
                    <h3 className="text-3xl md:text-4xl font-black leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-lg md:text-xl text-accent-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar - dramatic numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 border-2 border-primary/20 bg-card/30 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-primary mb-3">98%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-primary mb-3">3×</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Faster Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-primary mb-3">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-primary mb-3">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Satisfaction</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
