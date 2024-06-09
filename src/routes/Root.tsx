import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="root">
      <Outlet/>
      <h1>Root route</h1>
      <p>
        <Link to="/genki-3">Genki third edition</Link>
      </p>
    </div>
  )
}