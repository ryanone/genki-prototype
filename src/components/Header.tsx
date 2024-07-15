import { Link } from 'react-router-dom';
import GenkiImg from '@/assets/genki.png';
import styles from './Header.module.css';

type HeaderProps = {
  bookId: string;
  description: string;
  title: string;
};

export default function Header({ bookId, description, title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>
        <img className={styles.logo} src={GenkiImg} height="120" width="120" alt="Genki in Hiragana" />
        <Link className={styles.title} to={`/${bookId}`}>{title}</Link>
        <div className={styles.description}>{description}</div>
      </h1>
      <a
        className={styles.forkMe}
        href="https://github.com/SethClydesdale/genki-study-resources"
        target="_blank"
      >
        FORK ME
      </a>
    </header>
  );
}
