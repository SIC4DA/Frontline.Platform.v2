import Elysia, { t } from "elysia";

import { REGEX } from "@/constants/regex";
import {
  deleteFileService,
  extractPublicId,
  uploadFileService,
} from "@/services/cloudnary";
import { betterAuthMiddleware } from "@api/apps/auth/auth.middleware";
import { BadRequestError } from "@api/error/bad-request.error";

export const fileRouter = new Elysia({ name: "file", tags: ["File"] })
  .use(betterAuthMiddleware)
  .post(
    "/image/upload",
    async ({ body: { file } }) => {
      try {
        const uploadedResponse = await uploadFileService(file, "frontline");

        return {
          url: uploadedResponse.secure_url,
          publicId: uploadedResponse.public_id,
          width: uploadedResponse.width,
          height: uploadedResponse.height,
          created_at: uploadedResponse.created_at,
        };
      } catch {
        throw new BadRequestError("Image upload failed");
      }
    },
    {
      body: t.Object({
        file: t.File({
          error: "File is required",
          type: "image/*",
          maxSize: 1024 * 1024 * 5,
          maxItems: 1,
        }),
      }),
      detail: {
        summary: "Upload user image",
      },
    },
  )
  .delete(
    "/image",
    async ({ query: { url }, user }) => {
      if (user.image !== url) {
        throw new BadRequestError("Image URL does not match user image");
      }

      const publicId = extractPublicId(url);
      if (!publicId) {
        throw new BadRequestError("Image URL is required");
      }

      try {
        await deleteFileService(publicId);
      } catch {
        throw new BadRequestError("Image deletion failed");
      }
    },
    {
      query: t.Object({
        url: t.String({ error: "Image URL is required", pattern: REGEX.URL }),
      }),
      detail: {
        summary: "Delete user image",
      },
      auth: true,
    },
  );
