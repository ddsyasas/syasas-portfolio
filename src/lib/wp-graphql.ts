import { GraphQLClient, gql } from 'graphql-request';

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.ddsyasas.com/graphql';

export const client = new GraphQLClient(WP_GRAPHQL_URL);

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

export async function fetchPostsAndCategories() {
  const data = await client.request(GET_POSTS_AND_CATEGORIES) as any;
  return {
    posts: data.posts.nodes,
    categories: data.categories.nodes,
  };
}

export async function fetchPostBySlug(slug: string) {
  const data = await client.request(GET_POST_BY_SLUG, { slug }) as any;
  return data.postBy;
} 