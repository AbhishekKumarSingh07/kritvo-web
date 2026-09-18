#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import openapiTS, { astToString } from "openapi-typescript";

const contractPath = process.env.API_CONTRACT_PATH ?? "../kritvo-api/openapi/openapi.json";
const outPath = "src/api-client/generated/schema.d.ts";

const ast = await openapiTS(new URL(contractPath, `file://${process.cwd()}/`));
const output = astToString(ast);

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, output);

console.log(`Generated ${outPath} from ${contractPath}`);
