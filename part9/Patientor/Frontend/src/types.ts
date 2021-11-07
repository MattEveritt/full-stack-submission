export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum EntryType {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthCare',
    HealthCheck = 'HealthCheck',
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Array<Entry>;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry = HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type UnionOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type NewEntry = Omit<Entry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
