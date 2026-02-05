import { motion } from "motion/react";
import { Sparkles, Zap, Shield } from "lucide-react";

export function ServicesHero() {
  return (
    <section className="min-h-screen p-8 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="w-full max-w-[1200px] z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Augmented Virtual Services</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] text-center text-secondary-foreground mb-8 tracking-[-0.02em] uppercase"
        >
          3x Faster.
          <br />
          <span className="text-primary">98% Accurate.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-center text-accent-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We combine AI automation with human expertise to deliver data entry,
          virtual assistance, and specialized services that outperform traditional agencies.
        </motion.p>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              AI pre-processes tasks, humans verify. 3x faster turnaround.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              98%+ accuracy with dual-layer quality checks.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
            <Sparkles className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">24/7 Coverage</h3>
            <p className="text-sm text-muted-foreground">
              Round-the-clock service with instant response times.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <a
            href="/contact"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-accent transition-colors text-center"
          >
            View Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
