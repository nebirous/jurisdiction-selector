import React from 'react';
import {useJurisdictions} from '../hooks/useJurisdictions';
import Checkbox from './ui/Checkbox';

const JurisdictionSelector = () => {
  const {
    jurisdictions,
    loading,
    subJurisdictionsLoading,
    error,
    selectedJurisdictions,
    toggleJurisdiction,
  } = useJurisdictions();

  const renderLoadingSpinner = () => (
    <div className="flex justify-center h-32 items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
    </div>
  );

  const renderError = () => (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error} </span>
    </div>
  );

  const renderSubJurisdictions = (jurisdiction) => {
    if (subJurisdictionsLoading[jurisdiction.id]) {
      return renderLoadingSpinner();
    }

    if (jurisdiction.subJurisdictions && jurisdiction.subJurisdictions.length > 0) {
      return jurisdiction.subJurisdictions.map((subJurisdiction) => (
        <Checkbox
          key={subJurisdiction.id}
          label={subJurisdiction.name}
          checked={!!selectedJurisdictions[jurisdiction.id]?.[subJurisdiction.id]}
          onChange={() => toggleJurisdiction(subJurisdiction.id, true)}
          className="mb-1"
        />
      ));
    }

    return (
      <div className="text-sm text-gray-500">
        No sub-jurisdictions available
      </div>
    );
  };

  const renderJurisdiction = (jurisdiction) => (
    <div key={jurisdiction.id} className="mb-3">
      <Checkbox
        label={jurisdiction.name}
        checked={!!selectedJurisdictions[jurisdiction.id]}
        onChange={() => toggleJurisdiction(jurisdiction.id)}
        loading={subJurisdictionsLoading[jurisdiction.id]}
      />
      {selectedJurisdictions[jurisdiction.id] && (
        <div className="ml-6 mt-2 max-h-32 overflow-y-auto pr-2">
          {renderSubJurisdictions(jurisdiction)}
        </div>
      )}
    </div>
  );

  if (loading) return renderLoadingSpinner();
  if (error) return renderError();

  return (
    <div className=" bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Select jurisdictions</h2>
      <div>{jurisdictions.map(renderJurisdiction)}</div>
    </div>
  );
};

export default JurisdictionSelector;
