import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      width: {
        "half": "50%",
        "fit": "fit-content",
      },
    },
  },
} as Options;
