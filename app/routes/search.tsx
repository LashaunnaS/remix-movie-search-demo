import { json } from '@remix-run/node';
import { useState } from 'react';

export let loader = () => json({});

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Search for a Movie</h1>
      <form method="get" action="/results" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter a movie title"
          value={query}
          name="query"
          onChange={(event) => setQuery(event.target.value)}
          className="p-4 rounded-lg border-gray-300 border w-80 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="p-4 rounded-lg bg-blue-600 text-white font-bold">
          Search
        </button>
      </form>
    </div>
  );
}
