import * as _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';
import { useStravaService, useStravaState } from '../providers/strava.provider';

export default function Auth() {
  const router = useRouter();
  const stravaState = useStravaState();
  const { connect } = useStravaService();

  useEffect(() => {
    const code = _.get(router, 'query.code');

    if (!code) {
      return;
    }

    connect(code as string);
  }, [router, connect]);

  useEffect(() => {
    if (stravaState.accessToken) {
      Router.push('/strava');
    }
  }, [stravaState.accessToken]);

  if (!stravaState.loading && stravaState.accessToken) {
    return null;
  }

  return (
    <main>
      <div className="h-screen flex items-center justify-center">
        <div>
          <PropagateLoader color={'rgb(220 38 38)'} />
        </div>
      </div>
    </main>
  );
}
