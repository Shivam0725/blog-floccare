import OpenAI from "openai";
import { PineconeClient } from "@pinecone-database/pinecone";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pinecone = new PineconeClient();

await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const index = pinecone.Index("blogs"); // Your Pinecone index name

// Save a blog: generate embedding + store in Pinecone
export const saveBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content required" });

    // Generate embedding for title
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: title,
    });

    const vector = embeddingResponse.data[0].embedding;

    // Upsert into Pinecone
    await index.upsert({
      upsertRequest: {
        vectors: [{ id: title, values: vector, metadata: { content } }],
      },
    });

    res.json({ message: "Blog saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save blog" });
  }
};

// Search blogs: semantic search
export const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    // Generate embedding for query
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });
    const vector = embeddingResponse.data[0].embedding;

    // Query Pinecone
    const searchResponse = await index.query({
      queryRequest: {
        topK: 10,
        includeMetadata: true,
        vector,
      },
    });

    // Return top results
    const results = searchResponse.matches.map((match) => ({
      title: match.id,
      content: match.metadata.content,
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
};
