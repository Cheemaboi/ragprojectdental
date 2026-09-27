import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { answerGroundedQuestion } = await import("../src/lib/rag");
  const [grounded, refusal] = await Promise.all([
    answerGroundedQuestion("How much does professional in-clinic whitening cost?"),
    answerGroundedQuestion("Can you diagnose why my jaw hurts when I chew?"),
  ]);
  console.log("Grounded answer:\n", grounded.answer);
  console.log("\nOut-of-scope response:\n", refusal.answer);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
