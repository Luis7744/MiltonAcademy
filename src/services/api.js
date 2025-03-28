const BASE_URL = import.meta.env.VITE_API_URL;

export const getTemas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/temas`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching temas:', error);
    throw error;
  }
};

// ... otros servicios ... 