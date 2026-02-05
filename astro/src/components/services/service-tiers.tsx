import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    subtitle: "Data Entry",
    price: "$5–8",
    unit: "/hour",
    description: "High-volume tasks. Quick turnaround. No frills.",
    features: [
      "Online/offline data entry",
      "Copy-paste operations",
      "Form filling & validation",
      "PDF → Excel/Word conversion",
      "Simple data cleaning",
      "24–48 hour turnaround",
      "98% accuracy guarantee",
    ],
    accent: false,
  },
  {
    name: "Professional",
    subtitle: "Virtual Assistance",
    price: "$8–15",
    unit: "/hour",
    description: "Recurring support. Dedicated account manager. Premium touch.",
    features: [
      "Email & calendar management",
      "Customer support (email/chat)",
      "Data research & reporting",
      "CRM updates & maintenance",
      "Social media scheduling",
      "Priority response time",
      "Dedicated account manager",
      "Quality assurance review",
    ],
    accent: true,
  },
  {
    name: "Specialized",
    subtitle: "Expert Services",
    price: "$15–25",
    unit: "/hour",
    description: "Industry expertise. AI-augmented workflows. White-glove service.",
    features: [
      "E-commerce product listings",
      "Medical transcription",
      "Legal data entry",
      "Database management",
      "AI-augmented processing",
      "Business intelligence data",
      "Same-day turnaround available",
      "White-glove concierge service",
    ],
    accent: false,
  },
];

export function ServiceTiers() {
  return (
    <section id="pricing" className="relative py-32 md:py-40 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section header - asymmetric */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono tracking-wider text-primary uppercase border-l-2 border-primary pl-3 inline-block mb-6">
                Pricing
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter text-secondary-foreground">
                Choose
                <br />
                Your Scale
              </h2>
            </motion.div>
          </div>
          
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-accent-foreground leading-relaxed"
            >
              Flexible pricing that scales with your needs. No lock-in contracts. 
              Cancel anytime. Pay only for what you use.
            </motion.p>
          </div>
        </div>

        {/* Pricing cards - staggered grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`group relative ${tier.accent ? 'md:-translate-y-8' : ''}`}
            >
              <div className={`relative h-full p-8 border-2 transition-all duration-300 ${
                tier.accent
                  ? 'border-primary bg-primary/5 hover:border-primary hover:shadow-2xl hover:shadow-primary/20'
                  : 'border-border bg-card hover:border-primary/50'
              }`}>
                
                {/* Popular badge */}
                {tier.accent && (
                  <div className="absolute -top-4 left-8 px-4 py-1 bg-primary text-primary-foreground text-xs font-mono tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">
                    {tier.subtitle}
                  </div>
                  <h3 className="text-3xl font-black mb-3">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black text-primary">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.unit}</span>
                  </div>
                  <p className="text-sm text-accent-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/contact"
                  className={`group/btn flex items-center justify-center gap-2 w-full py-4 font-semibold transition-all duration-300 ${
                    tier.accent
                      ? 'bg-primary text-primary-foreground hover:gap-3'
                      : 'border-2 border-border hover:border-primary hover:text-primary hover:gap-3'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom solutions callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-12 border-2 border-border bg-card/50 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black mb-4">Need something custom?</h3>
              <p className="text-lg text-accent-foreground leading-relaxed">
                We offer monthly retainers, project-based pricing, and enterprise packages. 
                Let's talk about your specific needs.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold hover:gap-3 transition-all duration-300"
              >
                Contact Sales
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
