import { merchants } from '@/data/merchants';
import { Merchant } from '@/types';

export const getMerchants = (): Merchant[] => {
  return merchants;
};

export const getMerchantById = (id: number): Merchant | undefined => {
  return merchants.find((m) => m.id === id);
};

export const getMerchantsByCategory = (category: string): Merchant[] => {
  if (!category || category === 'all') return merchants;
  if (category === 'cafe') return merchants.filter((m) => m.category === 'cafe');
  if (category === 'restaurant') return merchants.filter((m) => m.category === 'restaurant');
  if (category === 'library') return merchants.filter((m) => m.category === 'library');
  return merchants;
};
