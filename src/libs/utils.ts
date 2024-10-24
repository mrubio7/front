import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEAGUES } from './consts';
import { ClearState as ClearUserState } from '@/components/ibercs/user/state';

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

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64Digest;
}

export const Logout = async (code:string) => {
  ClearUserState()
  code = code
  // const res = await ApiBackend.Users.Logout(code)
  // if (res) {
  // }
}