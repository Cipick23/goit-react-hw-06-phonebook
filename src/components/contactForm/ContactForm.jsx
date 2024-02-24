import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import BasicAlert from 'components/alert/Alert';

const CONTACT_KEY = 'contact';

const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem(CONTACT_KEY);

    if (storedContacts) {
      setList(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(list));
  }, [list]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicate) {
      setShowAlert(true);
    } else {
      addContact({ name, number });
      setName('');
      setNumber('');
      setShowAlert(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Numele contactului"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Numărul de telefon"
            required
          />
        </Form.Group>
        <Button type="submit">Adaugă contact</Button>
      </Form>

      <BasicAlert
        name={name}
        number={number}
        showAlert={showAlert}
        onClose={handleAlertClose}
      />
    </>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
