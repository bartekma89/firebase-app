import { useMemo } from "react";

import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import qs from "query-string";

export function useRouter<
  P = unknown,
  L = unknown,
  H = unknown,
  M = unknown
>() {
  const params = useParams<P>();
  const location = useLocation<L>();
  const history = useHistory<H>();
  const match = useRouteMatch<M>();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...qs.parse(location.search),
        ...params,
      },
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
