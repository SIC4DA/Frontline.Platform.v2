import { app } from "@/app/api/[[...slugs]]/route";
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty(app);

