import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import type { HealthResponse, User } from '@/types';
import { UserCard } from '@/components/UserCard';

export default function Home() {
  const {
    data: health,
    loading: healthLoading,
    error: healthError,
  } = useApi<HealthResponse>('/health');
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Fetch users directly (demonstrates another usage pattern)
  useEffect(() => {
    setUsersLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setUsers(json.data))
      .catch((err) => setUsersError(err.message))
      .finally(() => setUsersLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to ReactFullstack
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A production-ready base for full-stack React + Express apps.
        </p>
      </section>

      {/* Health check */}
      <section className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-3 text-xl font-semibold">Backend Status</h2>
        {healthLoading && <p className="text-gray-500">Checking server...</p>}
        {healthError && <p className="text-red-500">Error: {healthError}</p>}
        {health && !healthLoading && !healthError && (
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="text-green-600">{health.status}</span>
            </p>
            <p>
              <span className="font-medium">Timestamp:</span>{' '}
              {new Date(health.timestamp).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Uptime:</span>{' '}
              {Math.round(health.uptime)}s
            </p>
          </div>
        )}
      </section>

      {/* Users list */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Users</h2>
        {usersLoading && <p className="text-gray-500">Loading users...</p>}
        {usersError && <p className="text-red-500">Error: {usersError}</p>}
        {!usersLoading && !usersError && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}
        {!usersLoading &&
          !usersError &&
          users.map((user) => <UserCard key={user.id} user={user} />)}
      </section>
    </div>
  );
}
