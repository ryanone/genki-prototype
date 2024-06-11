import { useLoaderData } from 'react-router-dom';

export default function Exercise() {
  const exercise = useLoaderData();

  return (
    <div className="exerciseroute">
      <h1>Exercise route</h1>
    </div>
  )
}