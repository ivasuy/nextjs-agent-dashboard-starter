'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { scaleIn } from '@/lib/animations';

interface SuccessScreenProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function SuccessScreen({ title, description, actions }: SuccessScreenProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="bg-success/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <Check className="text-success h-8 w-8" />
      </div>
      <h2 className="text-xl font-bold text-(--text-primary)">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm text-(--text-secondary)">{description}</p>
      )}
      {actions && <div className="mt-6 flex gap-3">{actions}</div>}
    </motion.div>
  );
}
