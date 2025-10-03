import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "PUBLIC_",
	server: {
		SMTP_API_KEY: z.string().min(1),
		SMTP_EMAIL: z.string().min(1).email(),
		SMTP_SERVER: z.string().min(1),
	},
	client: {},
	runtimeEnv: import.meta.env,
});
