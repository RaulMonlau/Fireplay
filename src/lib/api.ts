import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api/games';

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number | null;
  genres: { id: number; name: string; slug: string }[];
}

export interface GameDetails extends Game {
  description_raw: string;
  description: string;
  website: string;
  ratings_count: number; // Añadimos esta propiedad
  developers: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string; slug: string } }[];
  screenshots: { id: number; image: string }[];
  tags: { id: number; name: string }[];
}
// Obtener juegos populares o por búsqueda
export async function getGames(
  search: string = '', 
  page: number = 1, 
  filters: { genres?: string; platforms?: string; } = {}
) {
  try {
    // Construir objeto de parámetros correctamente
    const params: Record<string, any> = {
      key: API_KEY,
      page,
      page_size: 20,
    };
    
    // Añadir parámetros opcionales solo si tienen valor
    if (search && search.trim() !== '') {
      params.search = search.trim();
    }
    
    if (filters.genres && filters.genres.trim() !== '') {
      params.genres = filters.genres.trim();
    }
    
    if (filters.platforms && filters.platforms.trim() !== '') {
      params.platforms = filters.platforms.trim();
    }
    
    // Añadir un parámetro de ordenación para asegurar resultados
    params.ordering = '-added';
    
    console.log('Fetching RAWG API with params:', params);
    console.log('API URL:', BASE_URL);
    
    const response = await axios.get(BASE_URL, { params });
    
    console.log('API Response status:', response.status);
    console.log('Games count:', response.data.count);
    console.log('First game (if available):', response.data.results?.[0]?.name);
    
    return {
      results: response.data.results as Game[],
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
  } catch (error) {
    console.error('Error fetching games from RAWG API:', error);
    
    // Si hay un error, devuelve un array vacío pero no uses mockups
    return { 
      results: [], 
      count: 0, 
      next: null, 
      previous: null 
    };
  }
}

// Obtener detalles de un juego específico
export async function getGameDetails(slug: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}`, {
      params: {
        key: API_KEY,
      },
    });
    
    return response.data as GameDetails;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
}

// Obtener capturas de pantalla de un juego
export async function getGameScreenshots(slug: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${slug}/screenshots`, {
      params: {
        key: API_KEY,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    return [];
  }
}

export async function verifyApiKey() {
  try {
    const testUrl = `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=1`;
    console.log('Verifying API key with URL:', testUrl);
    
    const response = await axios.get(testUrl);
    
    if (response.status === 200) {
      console.log('API key is valid! Sample data:', {
        count: response.data.count,
        firstGame: response.data.results?.[0]?.name || 'No games returned'
      });
      return true;
    } else {
      console.error('API key verification failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('API key verification failed with error:', error);
    return false;
  }
}