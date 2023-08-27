import classNames from 'classnames';
import { ReactNode } from 'react';

type CardColor = 'primary' | 'neutral' | 'white';

interface CardProps {
  children: ReactNode;
  color?: CardColor;
  title?: string;
  className?: string | undefined;
}

interface CardTitleProps {
  children: ReactNode;
  color?: CardColor;
}

interface CardContentProps {
  children: ReactNode;
  color?: CardColor;
}

export function CardTitle({ children, color = 'neutral' }: CardTitleProps) {
  const isPrimary = color == 'primary';

  return (
    <p
      className={classNames('text-xs font-bold uppercase leading-5 mt-3 mx-4', {
        ['text-cyan-800']: isPrimary
      })}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, color = 'neutral' }: CardContentProps) {
  const isPrimary = color == 'primary';
  return (
    <p
      className={classNames('text-sm mx-4 mb-3', {
        [' text-cyan-700']: isPrimary
      })}
    >
      {children}
    </p>
  );
}

export default function Card({
  children,
  color = 'neutral',
  title,
  className
}: CardProps) {
  const isPrimary = color == 'primary';
  const isNeutral = color == 'neutral';
  const isWhite = color == 'white';

  return (
    <div
      className={classNames(className, 'rounded-lg border border-b-2', {
        ['border-stone-200 border-b-stone-300 text-stone-800']:
          isNeutral || isWhite,
        ['bg-stone-50']: isNeutral,
        ['bg-white']: isWhite,
        ['border-cyan-300 bg-cyan-100']: isPrimary
      })}
    >
      {title && <CardTitle color={color}>{title}</CardTitle>}
      {children}
    </div>
  );
}
