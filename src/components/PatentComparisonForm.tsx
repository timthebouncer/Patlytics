import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const PatentComparisonForm = React.memo(({ onAnalyze }) => {
  const [patentId, setPatentId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        if (!patentId || !companyName) {
          setError('Plz fill the form');
          return;
        }
        setError('');
        onAnalyze({ patentId, companyName });
      },
      [patentId, companyName, onAnalyze]
  );

  return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="patentId">Patent ID</label>
            <input
                type="text"
                id="patentId"
                value={patentId}
                onChange={(e) => setPatentId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="US-RE49889-E1"
            />
          </div>

          <div>
            <label htmlFor="companyName">Company Name</label>
            <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Walmart Inc."
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Analyze
          </button>
          <Link
              to={`/record`}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Record
          </Link>
        </form>
      </div>
  );
});

export { PatentComparisonForm };
