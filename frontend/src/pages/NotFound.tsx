import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops — the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
