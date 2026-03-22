const API_URL = "/api/recipes";
 
/**
 * Fetches AI-generated recipe ideas from the backend.
 * @returns {Promise<{ recipes: Recipe[] }>} - Resolves with the parsed JSON response
 */
export async function fetchRecipeIdeas() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[fetchRecipeIdeas] called", {
      apiUrl: API_URL,
      at: new Date().toISOString(),
    });
  }

  const response = await fetch(API_URL, {
    method: "GET",
    cache: "no-store",
    // No auth headers needed — add here if requirements change:
    // headers: { Authorization: `Bearer ${token}` }
  });
 
  if (!response.ok) {
    const errorText = await response.text();
    if (process.env.NODE_ENV !== "production") {
      console.error("[fetchRecipeIdeas] failed", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
    }
    throw new Error(`Fetch failed (${response.status}): ${errorText}`);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[fetchRecipeIdeas] success", {
      status: response.status,
      statusText: response.statusText,
    });
  }
 
  return response.json();
}