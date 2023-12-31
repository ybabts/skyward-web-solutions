#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

import "https://deno.land/x/twindellisense@v1.0.0/load.ts";

await dev(import.meta.url, "./main.ts");
