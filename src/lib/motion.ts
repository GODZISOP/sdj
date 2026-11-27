export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_TACTILE = [0.2, 0.8, 0.2, 1] as const;

export const SPRING_CRISP = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.75,
};

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.14,
} as const;
