import { motion } from "motion/react";
import { Brain, Users, Clock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "AI-Powered Efficiency",
    description:
      "Our proprietary AI system pre-processes data, handles routine tasks, and flags anomalies—while humans focus on quality control and complex decision-making.",
  },
  {
    icon: Users,
    title: "Expert Human Team",
    description:
      "Carefully vetted professionals in Nigeria provide the human insight and attention to detail that AI alone can't match. Best of both worlds.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description:
      "Round-the-clock coverage means your work progresses while you sleep. No time zone delays, no waiting for business hours.",
  },
  {
    icon: TrendingUp,
    title: "Scalable On Demand",
    description:
      "Need to scale up for a big project? We flex with your needs—no hiring hassles, no long-term commitments. Pay only for what you use.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="min-h-screen p-8 py-24 bg-accent/30">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black leading-tight text-secondary-foreground mb-4 uppercase">
            Why Choose Us
          </h2>
          <p className="text-lg text-accent-foreground max-w-2xl mx-auto">
            We're not just another outsourcing agency. We're building the future of virtual services.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-accent-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">3x</div>
            <div className="text-sm text-muted-foreground">Faster Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
