import React from 'react';
import { useStateValue } from '../state';

import { Icon } from 'semantic-ui-react';

import { Entry } from '../types';

const EntriesList: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Style = {
    borderColor: 'grey',
    border: '2px solid grey',
    borderRadius: '5px',
    padding: '10px',
  };
  const [{ diagnoses }] = useStateValue();
  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={Style}>
          <div key={entry.id}>
            <p>
              {entry.date} {<Icon name="doctor" size='big'/>}
            </p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((d) => (
                <li key={d}>
                  {d} {diagnoses.filter((e) => e.code === d)[0].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={Style}>
          <div key={entry.id}>
            <p>
              {entry.date} {<Icon name="heart" />}
            </p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((d) => (
                <li key={d}>
                  {d} {diagnoses.filter((e) => e.code === d)[0].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'HealthCheck':
      return (
        <div style={Style}>
          <div key={entry.id}>
            <p>
              {entry.date} {<Icon name="stethoscope" />}
            </p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((d) => (
                <li key={d}>
                  {d} {diagnoses.filter((e) => e.code === d)[0].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntriesList;
