import { Link } from 'react-router';
import GenkiImg from '@/assets/genki.png';
import * as styles from './Header.css';

type HeaderProps = {
  bookId: string;
  description: string;
  title: string;
};

export default function Header({ bookId, description, title }: HeaderProps) {
  return (
    <header className={styles.headerClass}>
      <h1 className={styles.headingClass}>
        <img
          className={styles.logoClass}
          src={GenkiImg}
          height="120"
          width="120"
          alt="Genki in Hiragana"
        />
        <Link className={styles.titleClass} to={`/${bookId}`}>
          {title}
        </Link>
        <div className={styles.descriptionClass}>{description}</div>
      </h1>
      <a
        className={styles.forkMeClass}
        href="https://github.com/SethClydesdale/genki-study-resources"
        target="_blank"
      >
        FORK ME
      </a>
    </header>
  );
}
