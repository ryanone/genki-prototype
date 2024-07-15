export default function formatTimer(seconds: number): string {
  const numHours = `${Math.floor(seconds / 3600)}`;
  const numMinutes = `${Math.floor(seconds / 60)}`;
  const numSeconds = `${seconds % 60}`;
  return `${numHours.padStart(2, '0')}:${numMinutes.padStart(2, '0')}:${numSeconds.padStart(2, '0')}`;
}
