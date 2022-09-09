import { debounce } from 'debounce';

import { Icon } from '@iconify/react';

export default function Searchbar() {
  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon icon="ph:magnifying-glass" className="text-gray-900 dark:text-gray-100 sm:text-sm" />
      </div>
      <input
        type="text"
        className="w-full block rounded-md bg-gray-50 dark:bg-gray-600 border-gray-200 pl-7 text-gray-900 dark:text-gray-100 dark:border-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        onChange={(e) => {
          // debounce(() => setSearch(e.target.value), 500)();
        }}
      />
    </div>
  );
}
