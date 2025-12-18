import { Navigate } from '@solidjs/router';
import { Switch, Match } from 'solid-js';
import type { ParentProps } from 'solid-js';

export interface AuthGuardProps extends ParentProps {
  isAuthenticated?: boolean;
  redirectTo?: string;
}

export function AuthGuard(props: AuthGuardProps) {
  return (
    <Switch>
      <Match when={props.isAuthenticated}>{props.children}</Match>
      <Match when={!props.isAuthenticated}>
        <Navigate href={props.redirectTo ?? ''} />
      </Match>
    </Switch>
  );
}
