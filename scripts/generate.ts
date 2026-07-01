import { generateLlms } from "./generate-llms"
import { generateRobots } from "./generate-robots"
import { generateRss } from "./generate-rss"
import { generateSitemap } from "./generate-sitemap"

async function main() {
  console.log("Generating static files...\n")

  await generateLlms()
  await generateRss()
  await generateSitemap()
  await generateRobots()

  console.log("\n✓ All static files generated successfully.")
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
