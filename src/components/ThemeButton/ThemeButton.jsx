import { Button } from 'react-bootstrap';
import styles from './ThemeButton.module.css';

export default function ThemeButton({ toggleTheme }) {
  const handleThemeToggle = () => {
    toggleTheme();
  };
  return (
    <Button className={styles.switcherTheme} onClick={handleThemeToggle}>
      On/Off
    </Button>
  );
}
