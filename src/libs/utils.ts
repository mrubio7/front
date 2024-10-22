import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEAGUES } from './consts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GetTournamentColor = (tournament: string): string => {
  const leagues = Object.values(LEAGUES); 

  for (const league of leagues) {
      if (league.NAME === tournament) {
          return league.COLOR;
      }
  }
  
  return "bg-gray-500"; 
};