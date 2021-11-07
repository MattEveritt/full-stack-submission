import React from 'react';
import { Field, Form, Formik } from 'formik';

import {
    DiagnosisSelection,
    NumberField,
    TextField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckRating, EntryType, NewHealthCheckEntry } from '../types';
import { Button } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export type EntryFormValues = Omit<NewHealthCheckEntry, "id" | "entries">;

const submitNewEntry = async (values: EntryFormValues) => {
    
    const { id } = useParams<{ id: string }>();
    try {
      const { data: newEntry } = await axios.post<NewHealthCheckEntry>(
        `${apiBaseUrl}/patients/${id}`,
        values
      );
      console.log(newEntry);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };
const AddEntryForm = () => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                date: '',
                description: '',
                specialist: '',
                diagnosisCodes: [],
                healthCheckRating: HealthCheckRating.Healthy,

            }}
            onSubmit={submitNewEntry}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.date) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.type = requiredError;
                }
                if (!values.specialist) {
                    errors.type = requiredError;
                }
                if (values.type === EntryType.HealthCheck) {
                    if (
                        !values.healthCheckRating &&
                        values.healthCheckRating !== 0
                    ) {
                        errors.healthCheckRating = requiredError;
                    }
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="dd.mm.yyyy"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Button
                            type="submit"
                            floated="right"
                            color="green"
                            disabled={!dirty || !isValid}
                        >
                            Add Entry
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
