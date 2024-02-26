import { useDispatch } from 'react-redux';
import styles from './ContactItems.module.css';
import { Button } from 'react-bootstrap';
// import { deleteContact } from 'redux/contactSlice';
import { deleteContact } from '../../redux/contactSlice';

export default function ContactItems({ contact, id, phoneNumber }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(deleteContact(id));
  }

  return (
    <li className={styles.list}>
      <p>
        {contact}: {phoneNumber}
      </p>
      <Button onClick={() => handleDelete(id)}>Delete</Button>
    </li>
  );
}
