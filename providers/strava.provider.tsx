import _ from 'lodash';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { stravaService } from '../services/strava.service';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type Action =
  | 'INIT'
  | 'CONNECT_SUCCESS'
  | 'DISCONNECT'
  | 'LOADING'
  | 'SYNCING'
  | 'DISCONNECTING';

enum ActionType {
  INIT = 'INIT',
  CONNECT_SUCCESS = 'CONNECT_SUCCESS',
  DISCONNECT = 'DISCONNECT',
  LOADING = 'LOADING',
  SYNCING = 'SYNCING',
  DISCONNECTING = 'DISCONNECTING',
}

interface ReducerProps {
  type: Action;
  payload?: any;
}

interface StateContextProps {
  accessToken: string;
  athleteId: string;
  loading: boolean;
  syncing: boolean;
  disconnecting: boolean;
}

const StravaStateContext = createContext<Partial<StateContextProps>>({
  accessToken: undefined,
  athleteId: undefined,
  loading: true,
  syncing: false,
  disconnecting: false,
});

type StravaDispatchFn = (type: Action, payload?: any) => void;

const StravaDispatchContext = createContext<StravaDispatchFn>(
  (type: Action, payload?: any) => {},
);

const reducer = (state: any, { type, payload }: ReducerProps) => {
  switch (type) {
    case ActionType.INIT:
      return {
        ...state,
        ...payload,
      };
    case ActionType.CONNECT_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case ActionType.DISCONNECT:
      return {
        ...state,
        accessToken: '',
        athleteId: '',
      };
    case ActionType.LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ActionType.SYNCING:
      return {
        ...state,
        syncing: payload,
      };
    case ActionType.DISCONNECTING:
      return {
        ...state,
        disconnecting: payload,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

interface StravaProviderProps {
  children: React.ReactNode;
}

export const StravaProvider: FC<StravaProviderProps> = ({
  children,
}: StravaProviderProps) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    accessToken: '',
    athleteId: '',
  });

  const dispatch = useCallback(
    (type: Action, payload: any) => defaultDispatch({ type, payload }),
    [],
  );

  useEffect(() => {
    localStorage.setItem('accessToken', state.accessToken);
    localStorage.setItem('athleteId', state.athleteId);
  }, [state.accessToken, state.athleteId]);

  useEffect(() => {
    dispatch(ActionType.INIT, {
      accessToken: localStorage.getItem('accessToken'),
      athleteId: localStorage.getItem('athleteId'),
    });
  }, [dispatch]);

  return (
    <StravaStateContext.Provider value={state}>
      <StravaDispatchContext.Provider value={dispatch as any}>
        {children}
      </StravaDispatchContext.Provider>
    </StravaStateContext.Provider>
  );
};

export const useStravaState = () => useContext(StravaStateContext);
export const useStravaDispatch = () => useContext(StravaDispatchContext);

export function useStravaService() {
  const service = useRef(
    stravaService({
      baseURL: BASE_URL,
    }),
  );
  const dispatch: StravaDispatchFn = useStravaDispatch();

  useEffect(() => {
    service.current = stravaService({
      baseURL: BASE_URL,
      authorization: localStorage.getItem('accessToken') as string,
    });
  }, []);

  const connect = useCallback(
    function (code: string) {
      dispatch(ActionType.LOADING, true);

      service.current
        .connect(code)
        .then((res) => {
          const accessToken = _.get(res, 'data.responseSuccess.access_token');
          const athleteId = _.get(res, 'data.responseSuccess.athlete_id');

          dispatch('CONNECT_SUCCESS', {
            accessToken,
            athleteId,
          });

          service.current = stravaService({
            baseURL: BASE_URL,
            authorization: accessToken,
          });
        })
        .finally(() => {
          dispatch(ActionType.LOADING, false);
        });
    },
    [dispatch],
  );

  const disconnect = useCallback(
    function disconnect() {
      dispatch(ActionType.DISCONNECTING, true);

      service.current
        .disconnect()
        .then(() => {
          dispatch(ActionType.DISCONNECT);

          service.current = stravaService({
            baseURL: BASE_URL,
          });
        })
        .finally(() => {
          dispatch(ActionType.DISCONNECT, false);
        });
    },
    [dispatch],
  );

  const sync = useCallback(
    function sync() {
      dispatch(ActionType.SYNCING, true);

      service.current.sync().finally(() => {
        dispatch(ActionType.SYNCING, false);
      });
    },
    [dispatch],
  );

  return {
    connect,
    disconnect,
    sync,
  };
}
