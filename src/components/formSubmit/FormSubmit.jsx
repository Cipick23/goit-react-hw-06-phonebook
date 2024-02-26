import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactSlice';
import { getContacts } from '../../redux/selectors';
import { nanoid } from '@reduxjs/toolkit';
import styles from './FormSubmit.module.css';
import * as yup from 'yup';
import { Button, FormLabel } from 'react-bootstrap';

export default function FormSubmit() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [contact, setContact] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleSubmit(values) {
    const newValue = { ...values, id: nanoid() };

    if (!newValue.contact || !newValue.phoneNumber) {
      return;
    }

    const contactExist = contacts.some(
      item => item.contact === newValue.contact
    );

    if (contactExist) {
      toast(`${newValue.contact} is already in contacts.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    } else {
      dispatch(addContact(newValue));
    }

    setContact('');
    setPhoneNumber('');
  }

  return (
    <Formik
      initialValues={{
        contact: contact,
        phoneNumber: phoneNumber,
      }}
      validationSchema={yup.object({
        contact: yup
          .string()
          .min(1, 'Too Short Name!')
          .max(50, 'Too Long Name!')
          .required('Please write a name'),
        phoneNumber: yup
          .string()
          .min(9, 'Invalid Phone Number')
          .required('Please fill up the phone number!'),
      })}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm({
          values: {
            contact: contact,
            phoneNumber: phoneNumber,
          },
        });
      }}
    >
      <Form className={styles.form}>
        <FormLabel className={styles.label} htmlFor="contact">
          Name
        </FormLabel>
        <div className={styles.inputWrapper}>
          <Field
            className={styles.field}
            type="text"
            name="contact"
            placeholder="Name"
          />
        </div>

        <ErrorMessage
          className={styles.error}
          component="span"
          name="contact"
        />

        <FormLabel className={styles.label} htmlFor="phoneNumber">
          Number
        </FormLabel>

        <div className={styles.inputWrapper}>
          <Field
            className={styles.field}
            type="number"
            name="phoneNumber"
            placeholder="123 45 6789"
          />
        </div>

        <ErrorMessage
          className={styles.error}
          component="span"
          name="phoneNumber"
        />

        <Button className={styles.contactBtn} type="submit">
          Add contact
        </Button>
      </Form>
    </Formik>
  );
}
