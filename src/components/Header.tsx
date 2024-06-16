import GenkiImg from '@/assets/genki.png';
import { Link } from 'react-router-dom';
import './Header.css';

type HeaderProps = {
  bookId: string;
  description: string;
  title: string;
}

export default function Header({ bookId, description, title }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__heading">
        <img className="header__logo" src={GenkiImg} height="120" width="120"/>
        <Link className="header__title" to={`/${bookId}`}>{title}</Link>
        <div className="header__description">{description}</div>
      </h1>
      <a className="header__forkme" href="https://github.com/SethClydesdale/genki-study-resources" target="_blank">FORK ME</a>
    </header>
  )
}