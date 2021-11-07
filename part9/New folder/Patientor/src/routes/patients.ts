import express from 'express';
import patientService from '../services/patientService';
// import {  NewEntry } from '../types';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientOutput());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const patientInfo = patientService
            .getPatientOutput()
            .filter((p) => p.id === id);
        console.log(patientInfo);
        res.json(patientInfo);
    } catch (e) {
        res.status(400);
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const patient = patientService
        .getPatientOutput()
        .filter((p) => p.id === id);
    if (patient) {
        try {
            const newEntry = toNewEntry(req.body);
            const patient = patientService.addEntry(newEntry, id);
            res.json(patient.entries);
        } catch (e) {
            const message = (e as Error).message;
            res.status(400).send({ error: message });
        }
    } else {
        res.status(404);
    }
});

export default router;
