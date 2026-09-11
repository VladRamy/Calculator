export type Domain = 'PF' | 'RP' | 'BP' | 'GH' | 'VT' | 'SF' | 'RE' | 'MH';

export interface SF36Option {
  label: string;
  value: number;
}

export interface SF36Question {
  id: string;
  domain: Domain;
  text: string;
  options: SF36Option[];
}

export interface DomainInfo {
  id: Domain;
  name: string;
  description: string;
}

export interface ScoreResult {
  domain: Domain;
  name: string;
  rawScore: number;
  transformedScore: number;
  answeredCount: number;
  totalQuestions: number;
}