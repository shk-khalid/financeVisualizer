'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, PlusCircle, ListChecks } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedLandingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={ref} className="w-full" role="main">
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-label="Hero section"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <motion.div 
            className="relative flex flex-col items-center justify-center"
            variants={itemVariants}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-[#e1bb80]/20 rounded-full blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/flaticon.ico"
                  alt="Finance Visualizer Icon"
                  width={96}
                  height={96}
                  className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 transition-transform duration-300 hover:scale-105"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div className="space-y-4 sm:space-y-6" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#352208] drop-shadow-lg">
              Personal Finance Visualizer
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#7a5f38] max-w-2xl mx-auto leading-relaxed">
              Track, analyze, and visualize your financial journey with powerful insights and beautiful charts.
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4 sm:gap-6 pt-4"
            variants={itemVariants}
          >
            <Link 
              href="/transactions" 
              aria-label="Get started with Finance Visualizer"
              className="focus:outline-none focus:ring-2 focus:ring-[#574120] focus:ring-offset-2 rounded-lg transition-all duration-200"
            >
              <Button 
                size="lg" 
                className="bg-[#574120] hover:bg-[#352208] text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-label="Features section"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: PlusCircle,
              title: "Track Expenses",
              description: "Easily add and manage your daily expenses with our intuitive interface."
            },
            {
              icon: BarChart3,
              title: "Monthly Trends",
              description: "Visualize your spending patterns with interactive monthly expense charts."
            },
            {
              icon: PieChart,
              title: "Category Insights",
              description: "Understand your spending distribution across different categories."
            },
            {
              icon: ListChecks,
              title: "Transaction History",
              description: "Keep track of all your transactions with detailed history and filtering."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
              variants={itemVariants}
              style={{ willChange: 'transform, opacity' }}
              role="article"
              aria-label={`Feature: ${feature.title}`}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#e1bb80]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#574120]" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#352208] mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#7a5f38]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Demo Preview Section */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-label="Demo preview section"
      >
        <motion.div 
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#352208] text-center mb-8 sm:mb-12 lg:mb-16">
            See Your Finances in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[
              {
                icon: BarChart3,
                title: "Monthly Overview",
                description: "Get a clear view of your monthly spending patterns with our interactive bar charts. Track your expenses over time and identify trends in your financial behavior."
              },
              {
                icon: PieChart,
                title: "Category Analysis",
                description: "Break down your expenses by category with beautiful pie charts. Understand where your money goes and make informed financial decisions."
              }
            ].map((preview, index) => (
              <div key={index} className="space-y-4 sm:space-y-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#e1bb80]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <preview.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#574120]" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#574120]">{preview.title}</h3>
                <p className="text-base sm:text-lg text-[#7a5f38]">
                  {preview.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link 
              href="/transactions" 
              aria-label="Start managing your finances"
              className="focus:outline-none focus:ring-2 focus:ring-[#574120] focus:ring-offset-2 rounded-lg transition-all duration-200"
            >
              <Button 
                size="lg" 
                className="bg-[#574120] hover:bg-[#352208] text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Start Managing Your Finances
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 