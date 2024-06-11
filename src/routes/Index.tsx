import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="index">
      <h1>Index route</h1>
      <p>
        <Link to="/genki-3">Genki third edition</Link>
      </p>
    </div>
  )
}