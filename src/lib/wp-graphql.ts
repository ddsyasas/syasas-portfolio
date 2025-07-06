import { GraphQLClient, gql } from 'graphql-request';

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.ddsyasas.com/graphql';

export const client = new GraphQLClient(WP_GRAPHQL_URL);

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface Author {
  node: {
    name: string;
    slug: string;
  };
}

interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  modified: string;
  author: Author;
  categories: { nodes: Category[] };
  tags: { nodes: Category[] };
  featuredImage: FeaturedImage;
}

interface PostsResponse {
  posts: {
    nodes: Post[];
  };
  categories: {
    nodes: Category[];
  };
}

interface PostResponse {
  postBy: Post;
}

export const GET_POSTS_AND_CATEGORIES = gql`
  query GetPostsAndCategories {
    posts(first: 20) {
      nodes {
        id
        title
        slug
        date
        excerpt
        content(format: RENDERED)
        modified
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
    categories(first: 20) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      date
      excerpt
      content(format: RENDERED)
      modified
      author {
        node {
          name
          slug
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_FOR_SITEMAP = gql`
  query GetAllPostsForSitemap {
    posts(first: 1000) {
      nodes {
        slug
        modified
        date
      }
    }
  }
`;

interface AllPostsResponse {
  posts: {
    nodes: {
      slug: string;
      modified: string;
      date: string;
    }[];
  };
}

export async function fetchPostsAndCategories() {
  const data = await client.request(GET_POSTS_AND_CATEGORIES) as PostsResponse;
  return {
    posts: data.posts.nodes,
    categories: data.categories.nodes,
  };
}

export async function fetchPostBySlug(slug: string) {
  const data = await client.request(GET_POST_BY_SLUG, { slug }) as PostResponse;
  return data.postBy;
}

export async function fetchAllPostsForSitemap() {
  const data = await client.request(GET_ALL_POSTS_FOR_SITEMAP) as AllPostsResponse;
  return data.posts.nodes;
} 