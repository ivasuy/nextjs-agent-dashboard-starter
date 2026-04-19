import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import {
  cardVariants,
  cardHeaderVariants,
  cardBodyVariants,
  cardFooterVariants,
  type CardVariants,
  type CardHeaderVariants,
  type CardBodyVariants,
  type CardFooterVariants,
} from './Card.variants';

/* ---- Card Root ---- */
interface CardRootProps extends React.HTMLAttributes<HTMLDivElement>, CardVariants {}

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ variant, padding, className, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
  ),
);
CardRoot.displayName = 'Card';

/* ---- Card Header ---- */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, CardHeaderVariants {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ padding, className, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderVariants({ padding }), className)} {...props} />
  ),
);
CardHeader.displayName = 'Card.Header';

/* ---- Card Body ---- */
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement>, CardBodyVariants {}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ padding, className, ...props }, ref) => (
    <div ref={ref} className={cn(cardBodyVariants({ padding }), className)} {...props} />
  ),
);
CardBody.displayName = 'Card.Body';

/* ---- Card Footer ---- */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement>, CardFooterVariants {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ padding, className, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterVariants({ padding }), className)} {...props} />
  ),
);
CardFooter.displayName = 'Card.Footer';

/* ---- Compound Export ---- */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
