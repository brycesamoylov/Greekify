export interface Word {
  greek: string;
  english: string;
  phonetic?: string;  // Make phonetic optional since some entries might not have it
  mnemonic: string;
  id?: number;
}

// Import complete lists from their original files
export { greekWords } from './words';
export { travelWords } from './travel-words';
export { greetingsWords } from './greetings-words'; 