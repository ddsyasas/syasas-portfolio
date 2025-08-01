import axios from 'axios';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.ddsyasas.com/wp-json/wp/v2';
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME || '';
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || '';

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      slug: string;
    }>>;
  };
  yoast_head_json?: {
    title: string;
    description: string;
    og_image?: string;
    og_title?: string;
    og_description?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

class WordPressAPI {
  private apiUrl: string;
  private auth: string;

  constructor() {
    this.apiUrl = WORDPRESS_API_URL;
    // Create Basic Auth header using username and application password
    const credentials = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString('base64');
    this.auth = `Basic ${credentials}`;
  }

  async getPosts(params: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
  } = {}): Promise<WordPressPost[]> {
    const response = await axios.get(`${this.apiUrl}/posts`, {
      params: {
        _embed: true,
        ...params,
      },
      headers: {
        'Authorization': this.auth,
      },
    });
    return response.data;
  }

  async getPost(slug: string): Promise<WordPressPost> {
    const response = await axios.get(`${this.apiUrl}/posts`, {
      params: {
        slug,
        _embed: true,
      },
      headers: {
        'Authorization': this.auth,
      },
    });
    return response.data[0];
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/categories`, {
        headers: {
          'Authorization': this.auth,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getPostsByCategory(categorySlug: string): Promise<WordPressPost[]> {
    const categories = await this.getCategories();
    const category = categories.find(cat => cat.slug === categorySlug);
    
    if (!category) return [];
    
    return this.getPosts({ category: category.id });
  }
}

export const wordpressAPI = new WordPressAPI(); 