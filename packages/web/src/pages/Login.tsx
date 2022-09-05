import { FormEvent } from 'react';

import { useZoteraStore } from '../stores/useZoteraStore';

export default function Login() {
  const zotera = useZoteraStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full sm:w-3/4 md:w-1/2 bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:p-6 border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full block rounded-md bg-gray-50 dark:bg-gray-600 border-gray-200 text-gray-900 dark:text-gray-100 dark:border-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full block rounded-md bg-gray-50 dark:bg-gray-600 border-gray-200 text-gray-900 dark:text-gray-100 dark:border-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="py-3 text-right">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
