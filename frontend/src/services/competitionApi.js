const API_BASE_URL = 'http://localhost:3000';

export async function fetchCompetition(id = 'classical-dance') {
  const response = await fetch(`${API_BASE_URL}/api/competition/${id}`);

  if (!response.ok) {
    throw new Error(`Unable to load competition (${response.status})`);
  }

  return response.json();
}
