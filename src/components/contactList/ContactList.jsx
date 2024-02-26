import React from 'react';
import { useSelector } from 'react-redux';
import { getContacts, getFiltersContacts } from '../../redux/selectors';
import styles from './ContactList.module.css';
import ContactItems from 'components/contactItems/ContactItems';

export default function ContactsList() {
  const contacts = useSelector(getContacts);
  const filteredContacts = useSelector(getFiltersContacts);

  function filteredByContact() {
    const filter = filteredContacts.toLowerCase();
    const filtered = contacts.filter(item =>
      item.contact.toLowerCase().includes(filter)
    );
    return filtered;
  }

  const visibleContacts = filteredByContact();

  return (
    <ul className={styles.menu}>
      {visibleContacts.length === 0 && filteredContacts.length > 0 ? (
        <li className={`${styles.item} contact-list`}>
          No matching contacts found
        </li>
      ) : visibleContacts.length > 0 ? (
        visibleContacts.map(({ contact, phoneNumber, id }) => (
          <ContactItems
            key={id}
            id={id}
            contact={contact}
            phoneNumber={phoneNumber}
          />
        ))
      ) : contacts.length !== 0 ? (
        visibleContacts.map(({ contact, phoneNumber, id }) => (
          <ContactItems
            key={id}
            id={id}
            contact={contact}
            phoneNumber={phoneNumber}
          />
        ))
      ) : (
        ''
      )}
    </ul>
  );
}
