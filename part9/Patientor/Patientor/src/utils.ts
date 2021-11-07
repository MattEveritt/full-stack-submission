/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diagnosis, EntryType, Gender, HealthCheckRating, NewEntry, baseEntry, NewPatient, SickLeave, Discharge } from "./types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };

  const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date');
    }
    return date;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing name');
    }
    return ssn;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing name');
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing name');
    }
    return occupation;
  };

const toNewPatient = (object: any): NewPatient => {    
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: [],
    };

    return newPatient;
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const parseType = (type: any): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};

const parseString = (parameter: any, name: string): string => {
  if (!parameter || !isString(name)) {
    throw new Error(`Incorrect or missing ${name}`);
  }
  return parameter;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error('missing discharge');
  }
  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('missing sick leave');
  }

  return sickLeave as SickLeave;
};

const isHealthCheckRating = (parameter: any): parameter is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(parameter);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined || isHealthCheckRating(healthCheckRating) || healthCheckRating === null) {
    throw new Error('Invalid or missing healthcheck rating');
  }

  return healthCheckRating;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(codes) || !codes.every((code) => isString(code))) {
    throw new Error('Invalid diagnosis codes');
  }
  return codes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = toBaseEntry(object) as NewEntry;
  switch (baseEntry.type) {
    case EntryType.Hospital:
      baseEntry.discharge = parseDischarge(object.discharge);
      return baseEntry;

    case EntryType.HealthCheck:
      baseEntry.healthCheckRating = parseHealthCheckRating(object.HealthCheckRating);
      return baseEntry;

    case EntryType.OccupationalHealthcare:
      baseEntry.employerName = parseString(object.employerName, 'employer name');

      if (object.sickLeave) {
        baseEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return baseEntry;

    default:
      return assertNever(baseEntry);
  }
};

const toBaseEntry = (object: any): baseEntry => {
  const baseEntry: baseEntry = {
    specialist: parseString(object.specialist, 'specialist'),
    type: parseType(object.type),
    description: parseString(object.description, 'description'),
    date: parseDate(object.date)
  };

  if (object.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return baseEntry;
};

export default toNewPatient;