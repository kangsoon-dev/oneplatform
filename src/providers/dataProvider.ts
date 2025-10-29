import dataProvider from "@refinedev/simple-rest";

/**
 * Data Provider for ONE Platform
 *
 * Uses Refine's simple-rest data provider to connect to backend API.
 *
 * API Base URL should be configured via environment variable:
 * - Development: http://localhost:8000/api
 * - Production: https://api.oneplatform.bwlpg.com
 */

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || "https://api.fake-rest.refine.dev";

/**
 * Create data provider instance with custom configuration
 */
export const apiDataProvider = dataProvider(API_URL, {
  // Add custom headers for authentication
  headers: () => {
    const token = localStorage.getItem("oneplatform-auth-token");
    return {
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },
});

/**
 * Export utility to update API URL (for testing or runtime config)
 */
export const updateApiUrl = (newUrl: string) => {
  // This would require re-creating the data provider
  // For now, API URL should be set via environment variable
  console.warn("API URL is configured via VITE_API_URL environment variable");
};
