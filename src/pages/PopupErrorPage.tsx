import { useRouteError } from 'react-router-dom';

interface ErrorRouteState {
  statusText?: string;
  message: string;
}

export default function PopupErrorPage() {
  const error = useRouteError() as ErrorRouteState;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
