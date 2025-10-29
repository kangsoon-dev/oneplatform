import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "oneplatform-auth-token";

/**
 * Authentication Provider for ONE Platform
 *
 * This is a basic implementation that will be replaced with Azure AD OAuth 2.0.
 * For now, it uses localStorage for token management.
 *
 * TODO: Replace with Azure AD MSAL authentication
 */
export const authProvider: AuthProvider = {
  /**
   * Login method
   * Will be replaced with Azure AD OAuth flow
   */
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      // Store user info in localStorage (temporary - will use Azure AD tokens)
      localStorage.setItem(TOKEN_KEY, username || email);
      localStorage.setItem("user", JSON.stringify({
        id: "1",
        name: username || email,
        email: email || `${username}@bwlpg.com`,
        avatar: "https://i.pravatar.cc/300"
      }));

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },

  /**
   * Logout method
   * Will be replaced with Azure AD logout
   */
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  /**
   * Check authentication status
   * Will validate Azure AD token
   */
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
      error: {
        message: "Authentication required",
        name: "Unauthorized",
      },
    };
  },

  /**
   * Get permissions
   * Will use Azure AD groups for role-based access control
   */
  getPermissions: async () => {
    // TODO: Implement Azure AD group-based permissions
    return null;
  },

  /**
   * Get user identity
   * Will retrieve from Azure AD token
   */
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          return null;
        }
      }

      // Fallback user data
      return {
        id: "1",
        name: token,
        email: `${token}@bwlpg.com`,
        avatar: "https://i.pravatar.cc/300"
      };
    }

    return null;
  },

  /**
   * Error handler
   */
  onError: async (error) => {
    console.error("Auth error:", error);

    if (error.statusCode === 401 || error.statusCode === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return { error };
  },
};
