import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
// import useForceUpdate from 'use-force-update';

const MISSING_CONTEXT_ERROR = new Error(
  'useReactRouter may only be called within a <Router /> context.'
);
export function useReactRouter() {
  const context = useContext(__RouterContext);
  if (!context) {
    throw MISSING_CONTEXT_ERROR;
  }
  // const forceUpdate = useForceUpdate();

  // useEffect(() => context.history.listen(forceUpdate), [context]);

  return context;
}
