import type { User } from '@/types';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const initials = `${user.name.charAt(0)}`;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
        {initials}
      </div>
      <div>
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
