import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";

const tiers = [
  {
    name: "Basic Data Entry",
    price: "$5-8",
    unit: "per hour",
    description: "High-volume tasks with quick turnaround",
    features: [
      "Online/offline data entry",
      "Copy-paste tasks",
      "Form filling",
      "PDF to Excel/Word conversion",
      "Simple data cleaning",
      "24-48 hour turnaround",
      "98% accuracy guarantee",
    ],
    popular: false,
  },
  {
    name: "Virtual Assistance",
    price: "$8-15",
    unit: "per hour",
    description: "Recurring support for your business operations",
    features: [
      "Email management",
      "Calendar scheduling",
      "Customer support (email/chat)",
      "Data research & reporting",
      "CRM updates",
      "Social media posting",
      "Priority support",
      "Dedicated account manager",
    ],
    popular: true,
  },
  {
    name: "Specialized Services",
    price: "$15-25",
    unit: "per hour",
    description: "Premium services with industry expertise",
    features: [
      "E-commerce product listings (Amazon, Shopify)",
      "Medical transcription",
      "Legal data entry",
      "Database management",
      "AI-augmented data processing",
      "Business intelligence data entry",
      "Same-day turnaround available",
      "White-glove service",
    ],
    popular: false,
  },
];

export function ServiceTiers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="min-h-screen p-8 py-24 bg-background">
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
            Choose Your Service Tier
          </h2>
          <p className="text-lg text-accent-foreground max-w-2xl mx-auto">
            Flexible pricing to match your needs. Scale up or down anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative p-8 rounded-xl border ${
                tier.popular
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              } transition-all duration-300 ${
                hoveredIndex === index ? "scale-[1.02] shadow-lg" : ""
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-black text-primary">
                  {tier.price}
                </span>
                <span className="text-muted-foreground ml-2">{tier.unit}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-accent-foreground mb-6">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="/contact"
                className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-accent-foreground mb-4">
            Need a custom solution? We offer monthly retainers and project-based pricing.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Contact us for custom pricing
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
