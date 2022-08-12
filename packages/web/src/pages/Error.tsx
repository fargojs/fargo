import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex items-center flex-col justify-center h-full">
      <h2 className="text-center text-7xl">404</h2>
      <p className="mt-4">
        Houston, we have a problem.{' '}
        <Link className="text-orange-600" to="/">
          Head back to earth.
        </Link>
      </p>
    </div>
  );
}
