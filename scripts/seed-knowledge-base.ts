import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

function chunkMarkdown(markdown: string) {
  return markdown
    .split(/^## /m)
    .filter(Boolean)
    .map((section) => {
      const [heading] = section.trim().split("\n");
      return { section: heading.trim(), content: `## ${section.trim()}` };
    })
    .filter((chunk) => chunk.content.length > 40);
}

async function main() {
  const [{ embedTexts }, { createSupabaseServerClient }] = await Promise.all([
    import("../src/lib/rag"),
    import("../src/lib/supabase"),
  ]);
  const source = await readFile(path.join(process.cwd(), "content", "bright-smile-dental.md"), "utf8");
  const chunks = chunkMarkdown(source);
  const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));
  const supabase = createSupabaseServerClient();

  const { error: deleteError } = await supabase.from("documents").delete().eq("metadata->>source", "bright-smile-dental");
  if (deleteError) throw deleteError;

  const rows = chunks.map((chunk, index) => ({
    content: chunk.content,
    embedding: `[${embeddings[index].join(",")}]`,
    metadata: { source: "bright-smile-dental", section: chunk.section },
  }));
  const { error } = await supabase.from("documents").insert(rows);
  if (error) throw error;

  console.log(`Seeded ${rows.length} Bright Smile Dental knowledge chunks.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
