import { useParams } from 'react-router-dom';

import Error from './Error';

export default function Identifier() {
  const { identifier } = useParams();

  if (!identifier?.includes('.')) {
    return <Error />;
  }

  return (
    <div>
      Identifier
      {identifier}
    </div>
  );
}
