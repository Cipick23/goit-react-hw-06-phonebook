import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';
import { Card, CardBody } from 'react-bootstrap';

const CONTACT_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem(CONTACT_KEY);

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const addContact = contact => {
    const newContact = { id: nanoid(), ...contact };
    setContacts(prevContacts => [...prevContacts, newContact]);
    updateLocalStorage();
  };

  const onDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    updateLocalStorage();
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const updateLocalStorage = () => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  };

  return (
    <Card>
      <CardBody>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={addContact} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={onDeleteContact}
        />
      </CardBody>
    </Card>
  );
};

export default App;
