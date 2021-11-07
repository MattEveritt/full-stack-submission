import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import { Icon } from 'semantic-ui-react';

import { useStateValue, setPatient } from '../state';
import { useParams } from 'react-router';
import EntriesList from '../components/EntriesList';
import AddEntryForm from './AddEntryForm';

const PatientListPage = () => {
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  if (patientInfo.id !== id) {
    const getPatientInfo = async () => {
      try {
        const { data: patient } = await axios.get<Array<Patient>>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient[0]));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e.response?.data || 'Unknown Error');
      }
    };
    void getPatientInfo();
  }

  if (!patientInfo) {
    return null;
  }
  if (diagnoses.length === 0) {
    return null;
  }
  const entries: Array<Entry> = patientInfo.entries;

  return (
    <div>
      <h3>
        {patientInfo.name}{' '}
        {patientInfo.gender === 'male' ? (
          <Icon name="mars" />
        ) : (
          <Icon name="venus" />
        )}
      </h3>
      <p>ssn: {patientInfo.ssn}</p>
      <p>occupation: {patientInfo.occupation}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars*/}
      <AddEntryForm />
      <h5>entries</h5>
        {entries.map(e => 
          <div key={e.id}>
            <EntriesList entry={e}/> 
          </div>
        )}
    </div>
  );
};

export default PatientListPage;
