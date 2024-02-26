import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from '../redux/selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ThemeButton from './ThemeButton/ThemeButton';
import Filter from './filter/Filter';
import FormSubmit from './formSubmit/FormSubmit';
import ContactsList from './contactList/ContactList';
import { Button, Card, CardBody, CardGroup } from 'react-bootstrap';
// import { ThemeProvider } from 'react-bootstrap';
import styles from '../index.css';

// const theme = {
//   light: {
//     colors: {
//       mainBgColor: '#e9ecef',
//       textColor: '#050505',
//       contactBtn: '#2982ff',
//       deleteBtn: '#ff2929',
//       bgWrapper: '#f8f9fa',
//       containerColor: '#dee2e6',
//       itemsEven: '#f8f9fa',
//       itemsOdd: '#dee2e6',
//       boxShadow: 'rgba(255, 255, 255, 0.5)',
//     },
//   },
//   dark: {
//     colors: {
//       mainBgColor: '#1E1E1E',
//       textColor: '#fffaff',
//       contactBtn: '#2982ff',
//       deleteBtn: '#ff2929',
//       bgWrapper: '#0b0014',
//       containerColor: '#050505',
//       itemsEven: '#212529',
//       itemsOdd: '#343a40',
//       boxShadow: 'none',
//     },
//   },
// };

export default function App() {
  const contacts = useSelector(getContacts);
  const [isOpen, setIsOpen] = useState(contacts.length > 0);
  // const [isDarkTheme, setIsDarkTheme] = useState(contacts.length > 0);

  // const toggleTheme = () => {
  //   setIsDarkTheme(prevIsDarkTheme => !prevIsDarkTheme);
  // };

  return (
    <>
      {/* // <ThemeProvider theme={isDarkTheme ? theme.dark : theme.light}> */}
      <CardGroup className={styles.AppContainer}>
        {/* <ThemeButton toggleTheme={toggleTheme} /> */}
        <div className={styles.appWrapper}>
          <Button
            className={styles.appButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'}
          </Button>
          {isOpen && (
            <CardBody className={styles.appDiv}>
              <h1 className={styles.appTitle}>Phonebook</h1>
              <FormSubmit />
              {contacts.length > 0 && (
                <Card className={styles.appContactsDiv}>
                  <h2>Contacts</h2>
                  <Filter />
                  <ContactsList />
                </Card>
              )}
            </CardBody>
          )}
        </div>
      </CardGroup>
      <ToastContainer />
      {/* // </ThemeProvider> */}
    </>
  );
}
