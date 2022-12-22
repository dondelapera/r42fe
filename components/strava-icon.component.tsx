import Image from 'next/image';
import stravaLogo from '../assets/strava-logo.jpeg';

export function StravaIcon() {
  return (
    <div className="text-center mb-4">
      <Image
        src={stravaLogo}
        alt="strava-logo"
        className="w-16 rounded inline-block mb-1"
      />
      <h5 className="font-bold text-zinc-600">Strava</h5>
    </div>
  );
}
