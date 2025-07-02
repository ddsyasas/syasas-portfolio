/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
              },
            },
            h1: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h4: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h5: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h6: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--foreground))',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: 'hsl(var(--muted-foreground))',
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            table: {
              borderCollapse: 'collapse',
              width: '100%',
            },
            th: {
              borderBottom: '2px solid hsl(var(--border))',
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            td: {
              borderBottom: '1px solid hsl(var(--border))',
              padding: '0.75rem',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 