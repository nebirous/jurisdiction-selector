import { useState, useEffect, useCallback, useMemo } from 'react';
import { getJurisdictions, getSubJurisdictions } from '../services/api';

export const useJurisdictions = () => {
  const [jurisdictions, setJurisdictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState({});

  console.log(selectedJurisdictions)

  const fetchJurisdictions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const topLevelJurisdictions = await getJurisdictions();
      setJurisdictions(topLevelJurisdictions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJurisdictions();
  }, [fetchJurisdictions]);

  const fetchSubJurisdictions = useCallback(async (jurisdictionId) => {
    const jurisdiction = jurisdictions.find(j => j.id === jurisdictionId);
    if (jurisdiction?.subJurisdictions) return;

    try {
      const subJurisdictions = await getSubJurisdictions(jurisdictionId);
      setJurisdictions(prev =>
        prev.map(j =>
          j.id === jurisdictionId ? { ...j, subJurisdictions } : j
        )
      );
    } catch (err) {
      setError(`Failed to load sub-jurisdictions for ${jurisdictionId}: ${err.message}`);
    }
  }, [jurisdictions]);

  const toggleJurisdiction = useCallback((jurisdictionId, isSubJurisdiction = false) => {
    setSelectedJurisdictions(prev => {
      const newState = { ...prev };
      if (isSubJurisdiction) {
        const parentId = jurisdictions.find(j =>
          j.subJurisdictions?.some(sub => sub.id === jurisdictionId)
        )?.id;
        if (parentId) {
          newState[parentId] = {
            ...newState[parentId],
            [jurisdictionId]: !newState[parentId]?.[jurisdictionId],
          };
        }
      } else {
        if (newState[jurisdictionId]) {
          delete newState[jurisdictionId];
        } else {
          newState[jurisdictionId] = {};
          fetchSubJurisdictions(jurisdictionId);
        }
      }
      return newState;
    });
  }, [jurisdictions, fetchSubJurisdictions]);

  const subJurisdictionsLoading = useMemo(() => 
    jurisdictions.reduce((acc, jurisdiction) => {
      acc[jurisdiction.id] = selectedJurisdictions[jurisdiction.id] && !jurisdiction.subJurisdictions;
      return acc;
    }, {}),
    [jurisdictions, selectedJurisdictions]
  );

  return {
    jurisdictions,
    loading,
    subJurisdictionsLoading,
    error,
    selectedJurisdictions,
    toggleJurisdiction,
  };
};