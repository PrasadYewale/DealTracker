const express = require("express");
const cors = require("cors");
const { getJson } = require("serpapi");

const app = express();
const PORT = 8082;

app.use(cors());
app.use(express.json());

const SERPAPI_KEY = "5003a871e755dd6ed5dd631d56e784d78c9b48c4d58ccab6a67ebc263e7181ee";

// Search endpoint
app.get("/api/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Search query required" });
  }

  console.log(`🔍 Searching for: ${query}`);

  getJson(
    {
      engine: "google_shopping",
      q: query,
      api_key: SERPAPI_KEY
    },
    (json) => {
      console.log("✅ SerpAPI Response received");
      console.log("📊 Response keys:", Object.keys(json));
      console.log("📦 First product:", json.shopping_results?.[0]);
      
      res.json({
        shopping_results: json.shopping_results || [],
        organic_results: json.organic_results || [],
        total: json.shopping_results?.length || 0
      });
    }
  );
});

// Amazon search endpoint
app.get("/api/search/amazon", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Search query required" });
  }

  console.log(`🔍 Searching Amazon for: ${query}`);

  getJson(
    {
      engine: "amazon",
      k: query,
      amazon_domain: "amazon.com",
      api_key: SERPAPI_KEY
    },
    (json) => {
      console.log("✅ Amazon Search Response received");
      res.json({
        products: json.products || [],
        total: json.products?.length || 0
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});