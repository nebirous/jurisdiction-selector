// src/services/api.js
import { fetchJurisdictions, fetchSubJurisdictions, fetchJurisdiction } from '../fakeJurisdictionApi';

export const getJurisdictions = async () => {
  try {
    return await fetchJurisdictions();
  } catch (error) {
    console.error('Error fetching jurisdictions:', error);
    throw new Error('Failed to fetch jurisdictions');
  }
};

export const getSubJurisdictions = async (jurisdictionId) => {
  try {
    return await fetchSubJurisdictions(jurisdictionId);
  } catch (error) {
    console.error(`Error fetching sub-jurisdictions for ${jurisdictionId}:`, error);
    throw new Error(`Failed to fetch sub-jurisdictions for ${jurisdictionId}`);
  }
};

export const getJurisdiction = async (jurisdictionId) => {
  try {
    return await fetchJurisdiction(jurisdictionId);
  } catch (error) {
    console.error(`Error fetching jurisdiction ${jurisdictionId}:`, error);
    throw new Error(`Failed to fetch jurisdiction ${jurisdictionId}`);
  }
};