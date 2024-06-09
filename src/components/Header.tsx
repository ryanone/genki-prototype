import GenkiImg from '@/assets/genki.png';
import './Header.css';

type HeaderProps = {
  description: string;
  title: string;
}

export default function Header({ description, title }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__heading">
        <img className="header__logo" src={GenkiImg} height="120" width="120"/>
        <div className="header__title">{title}</div>
        <div className="header__description">{description}</div>
      </h1>
      <a className="header__forkme" href="https://github.com/SethClydesdale/genki-study-resources" target="_blank">FORK ME</a>
    </header>
  )
}