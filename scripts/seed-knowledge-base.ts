import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

type KnowledgeChunk = { content: string; metadata: { source: string; section: string; topic: string; last_reviewed: string } };

function topicFromFilename(filename: string) {
  return filename.replace(/^\d+-/, "").replace(/\.md$/, "").replaceAll("-", " ");
}

function chunkDocument(markdown: string, filename: string): KnowledgeChunk[] {
  const title = markdown.match(/^#\s+(.+)$/m)?.[1] ?? topicFromFilename(filename);
  const sections = markdown.split(/^##\s+/m).filter(Boolean);
  return sections.map((section) => {
    const [heading, ...body] = section.trim().split("\n");
    return {
      content: `# ${title}\n## ${heading}\n${body.join("\n").trim()}`,
      metadata: { source: filename, section: heading.trim(), topic: topicFromFilename(filename), last_reviewed: "2026-09-28" },
    };
  }).filter((chunk) => chunk.content.length > 80);
}

async function main() {
  const [{ embedTexts }, { createSupabaseServerClient }] = await Promise.all([import("../src/lib/rag"), import("../src/lib/supabase")]);
  const directory = path.join(process.cwd(), "content", "knowledge");
  const filenames = (await readdir(directory)).filter((name) => name.endsWith(".md")).sort();
  const chunks = (await Promise.all(filenames.map(async (filename) => chunkDocument(await readFile(path.join(directory, filename), "utf8"), filename)))).flat();
  const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));
  const supabase = createSupabaseServerClient();

  const { error: deleteError } = await supabase.from("documents").delete().or("metadata->>library.eq.bright-smile-v2,metadata->>source.eq.bright-smile-dental");
  if (deleteError) throw deleteError;

  const rows = chunks.map((chunk, index) => ({ content: chunk.content, embedding: `[${embeddings[index].join(",")}]`, metadata: { ...chunk.metadata, library: "bright-smile-v2" } }));
  const { error } = await supabase.from("documents").insert(rows);
  if (error) throw error;
  console.log(`Seeded ${rows.length} structured Bright Smile knowledge chunks from ${filenames.length} documents.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
