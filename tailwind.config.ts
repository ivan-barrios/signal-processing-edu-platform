import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			background: 'var(--background)',
			foreground: 'var(--foreground)'
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		typography: {
		  DEFAULT: {
			css: {
			  color: "#ffffff", // Default text color
			  maxWidth: "none", // Disable max width for better layout flexibility
  
			  // Headings
			  h1: {
				color: "#ffffff",
				fontWeight: "bold",
				fontSize: "2.5rem",
				marginTop: "1.5rem",
				marginBottom: "1rem",
				lineHeight: "1.2",
			  },
			  h2: {
				color: "#ffffff",
				fontWeight: "bold",
				fontSize: "2rem",
				marginTop: "1.5rem",
				marginBottom: "1rem",
				lineHeight: "1.3",
			  },
			  h3: {
				color: "#ffffff",
				fontWeight: "bold",
				fontSize: "1.75rem",
				marginTop: "1.25rem",
				marginBottom: "0.75rem",
				lineHeight: "1.4",
			  },
			  h4: {
				  color: "#ffffff", // White for h4
				  fontWeight: "600", // Slightly lighter than h1-h3
				  fontSize: "1.5rem", // Smaller size
				  marginTop: "1rem",
				  marginBottom: "0.75rem",
				  lineHeight: "1.5",
				},
  
			  // Text formatting
			  strong: {
				color: "#ffffff",
				fontWeight: "bold",
			  },
			  em: {
				color: "#ffffff",
				fontStyle: "italic",
			  },
			  blockquote: {
				color: "#d4d4d8", // Slightly lighter text for blockquotes
				fontStyle: "italic",
				borderLeft: "4px solid #4b5563", // Gray left border
				paddingLeft: "1rem",
				marginTop: "1.5rem",
				marginBottom: "1.5rem",
			  },
  
			  // Lists
			  ul: {
				listStyleType: "disc",
				paddingLeft: "1.5rem",
				color: "#ffffff",
				marginBottom: "1rem",
			  },
			  ol: {
				listStyleType: "decimal",
				paddingLeft: "1.5rem",
				color: "#ffffff",
				marginBottom: "1rem",
			  },
			  li: {
				marginBottom: "0.5rem",
			  },
  
			  // Links
			  a: {
				color: "#3b82f6", // Blue links
				textDecoration: "underline",
				"&:hover": {
				  color: "#2563eb", // Darker blue on hover
				},
			  },
  
			  // Code blocks and inline code
			  code: {
				color: "#facc15", // Yellow for inline code
				backgroundColor: "#1e293b", // Dark gray background
				padding: "0.25rem 0.5rem",
				borderRadius: "0.25rem",
				fontSize: "0.95rem",
			  },
			  pre: {
				backgroundColor: "#1e293b", // Dark gray background
				color: "#f8fafc", // Light text color for code
				padding: "1rem",
				borderRadius: "0.5rem",
				overflowX: "auto",
				fontSize: "0.9rem",
				lineHeight: "1.6",
			  },
  
			  // Tables
			  table: {
				width: "100%",
				borderCollapse: "collapse",
				marginTop: "1rem",
				marginBottom: "1rem",
			  },
			  th: {
				color: "#ffffff",
				borderBottom: "2px solid #4b5563", // Gray border for table headers
				textAlign: "left",
				padding: "0.5rem",
			  },
			  td: {
				color: "#d4d4d8", // Slightly lighter text for table data
				borderBottom: "1px solid #4b5563",
				padding: "0.5rem",
			  },
  
			  // Images
			  img: {
				borderRadius: "0.5rem",
				marginTop: "1rem",
				marginBottom: "1rem",
			  },
			},
		  },
	  },
	}
},
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
