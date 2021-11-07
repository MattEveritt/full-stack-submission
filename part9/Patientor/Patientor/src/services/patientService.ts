import patients from '../../data/patients';
import { Patient, PatientOutput, NewPatient, NewEntry, Entry } from '../types';
import * as uuid from 'uuid';

const id: string = uuid.v4();

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientOutput = (): PatientOutput[] => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries,
    }));
};

const addEntry = ( entry: NewEntry, pid: string): Patient => {
    const newEntry: Entry = {
        id: id,
        ...entry
    };
    const patientToUpdate = patients.filter(p => p.id = pid)[0];
    // console.log('patient to update', patientToUpdate);
    const values = Object.values(patientToUpdate);
    const newEntries: Entry[] = values.slice(-1)[0] as Entry[];
    // console.log('entries', newEntries);
    newEntries.push(newEntry);
    const patient: Patient = {
        ...patientToUpdate,
        entries: [
            ...newEntries
        ],
    };
    // console.log('updated patient', patient);
    patients.map(p => p.id === pid ? patient : p);
    return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatientOutput,
    addPatient,
    addEntry
};