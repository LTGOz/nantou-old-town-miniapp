import { merchants } from '@/data/merchants';
import { Merchant } from '@/types';

export const getMerchants = (category?: string): Merchant[] => {
  if (!category || category === 'all') return merchants;
  return merchants.filter((m) => m.category === category);
};

export const getMerchantById = (id: number): Merchant | undefined => {
  return merchants.find((m) => m.id === id);
};

export { getMerchants as getMerchantsByCategory };
