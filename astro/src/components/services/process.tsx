import { motion } from "motion/react";
import { FileText, Bot, CheckCircle, Send } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Share Your Requirements",
    description:
      "Tell us what you need. Whether it's data entry, virtual assistance, or specialized work, we'll understand your goals and timeline.",
  },
  {
    icon: Bot,
    title: "2. AI Pre-Processing",
    description:
      "Our AI system analyzes your project, structures the workflow, and handles the heavy lifting—automation at its finest.",
  },
  {
    icon: CheckCircle,
    title: "3. Human Quality Control",
    description:
      "Our expert team reviews every detail, ensuring accuracy and consistency. The human touch that makes all the difference.",
  },
  {
    icon: Send,
    title: "4. Delivery & Support",
    description:
      "Get your completed work on time, every time. Plus ongoing support if you need revisions or have questions.",
  },
];

export function ProcessSection() {
  return (
    <section className="min-h-screen p-8 py-24 bg-background">
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
            How It Works
          </h2>
          <p className="text-lg text-accent-foreground max-w-2xl mx-auto">
            From inquiry to delivery, we've streamlined every step to save you time.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-border" />
                )}

                {/* Step Card */}
                <div className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 relative z-10">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-accent-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your First Project
            <Send className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
