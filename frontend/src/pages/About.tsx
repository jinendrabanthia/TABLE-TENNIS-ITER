import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">About This Project</h1>

      <div className="space-y-4 text-gray-700">
        <p>
          This is a base template for building full-stack web applications with
          React on the frontend and Express on the backend. It includes
          TypeScript, Tailwind CSS, React Router, and a structured backend with
          controllers, routes, middleware, and error handling.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>
            <strong>Frontend:</strong> React 18, TypeScript, Vite, Tailwind CSS,
            React Router v6
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express, TypeScript, CORS, dotenv
          </li>
          <li>
            <strong>Tooling:</strong> ESLint, Prettier, TypeScript path aliases
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
        <p>
          Run{' '}
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
            npm run dev
          </code>{' '}
          from the project root to start both the frontend and backend in
          development mode.
        </p>
      </div>

      <Link
        to="/"
        className="inline-block rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
