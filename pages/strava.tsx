import Router from 'next/router';
import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { BtnPrimary } from '../components/btn-primary.component';
import { BtnSecondary } from '../components/btn-secondary.component';
import { StravaIcon } from '../components/strava-icon.component';
import { useStravaService, useStravaState } from '../providers/strava.provider';

export default function Strava() {
  const stravaState = useStravaState();
  const stravaService = useStravaService();

  useEffect(() => {
    if (!stravaState.accessToken) {
      Router.push('/');
    }
  }, [stravaState.accessToken]);

  if (!stravaState.accessToken) {
    return null;
  }

  return (
    <main>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full p-6 md:p-0 md:w-1/4 lg:w-1/4">
          <StravaIcon />
          <div className="text-center mb-6">
            <a
              className="text-cyan-400 hover:text-cyan-300"
              href={`https://www.strava.com/athletes/${stravaState.athleteId}`}
            >
              https://www.strava.com/athletes/{stravaState.athleteId}
            </a>
          </div>
          <BtnSecondary
            disabled={stravaState.disconnecting}
            onClick={() => {
              stravaService.disconnect();
            }}
          >
            {stravaState.disconnecting && (
              <span className="inline-block scale-50">
                <SyncLoader size={15} color={'rgb(220 38 38)'} />
              </span>
            )}
            {!stravaState.disconnecting && 'Disconnect'}
          </BtnSecondary>
          <div className="py-2" />

          <BtnPrimary
            disabled={stravaState.syncing}
            onClick={() => {
              stravaService.sync();
            }}
          >
            {stravaState.syncing && (
              <span className="inline-block scale-50">
                <SyncLoader size={15} color={'white'} />
              </span>
            )}
            {!stravaState.syncing && 'Sync'}
          </BtnPrimary>
        </div>
      </div>
    </main>
  );
}
