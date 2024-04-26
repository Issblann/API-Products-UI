import { useState } from 'react';

type SearchProps = {
  onSearch: (value: string) => void;
};
export const Search = () => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // onSearch(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[80%] max-w-2xl">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-slate-100 rounded-lg border border-[#33272a] focus:ring-[#ff8ba7] focus:border-[#ff8ba7]"
          placeholder="Search a product..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-slate-500 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </form>
  );
};
