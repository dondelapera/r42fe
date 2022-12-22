import Router from 'next/router';
import { BtnLinkPrimary } from '../components/btn-link-primary.component';
import { StravaIcon } from '../components/strava-icon.component';
import { useStravaState } from '../providers/strava.provider';

const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_STRAVA_OAUTH_REDIRECT_URL;
const stravaAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}?approval_prompt=force&scope=read_all,activity:read_all`;

export default function Home() {
  const stravaState = useStravaState();

  if (stravaState.accessToken && stravaState.athleteId) {
    Router.push('/strava');
    return null;
  }

  return (
    <main>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full p-6 md:p-0 md:w-1/4 lg:w-1/4">
          <StravaIcon />
          <BtnLinkPrimary href={stravaAuthUrl}>Connect</BtnLinkPrimary>
        </div>
      </div>
    </main>
  );
}
