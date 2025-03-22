import type { UploadApiErrorResponse } from "cloudinary";
import Elysia, { t } from "elysia";

import { betterAuthMiddleware } from "./auth";

import {
  deleteFileService,
  extractPublicId,
  uploadFileService,
} from "@/services/cloudnary";

export const fileRouter = new Elysia({ name: "file" })
  .use(betterAuthMiddleware)
  .post(
    "/image/upload",
    async ({ body, error }) => {
      try {
        const uploadedResponse = await uploadFileService(
          body.file,
          "frontline",
        );

        return {
          message: "Image uploaded successfully",
          data: {
            url: uploadedResponse.secure_url,
            publicId: uploadedResponse.public_id,
            width: uploadedResponse.width,
            height: uploadedResponse.height,
            created_at: uploadedResponse.created_at,
          },
          errors: null,
        };
      } catch (e) {
        const err = e as UploadApiErrorResponse;
        throw error(400, {
          message: "Image upload failed",
          data: null,
          errors: [
            {
              message: err.message,
              code: "BAD_REQUEST",
              http_code: err.http_code,
            },
          ],
        });
      }
    },
    {
      body: t.Object({
        file: t.File({ error: "File is required", type: "image/*" }),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            url: t.String(),
            publicId: t.String(),
            width: t.Number(),
            height: t.Number(),
            created_at: t.String(),
          }),
          errors: t.Null(),
        }),
        400: t.Object({
          message: t.String(),
          data: t.Null(),
          errors: t.Array(
            t.Object({
              message: t.String(),
              code: t.String(),
              http_code: t.Number(),
            }),
          ),
        }),
      },
    },
  )
  .delete(
    "/image",
    async ({ body: { url }, user, error }) => {
      if (user.image !== url) {
        throw error(400, {
          message: "Image URL does not match user image",
          data: null,
          errors: [
            {
              message: "Image URL does not match user image",
              code: "BAD_REQUEST",
              http_code: 400,
            },
          ],
        });
      }

      const publicId = extractPublicId(url);
      if (!publicId) {
        throw error(400, {
          message: "Public ID is required",
          data: null,
          errors: [
            {
              message: "Public ID is required",
              code: "BAD_REQUEST",
              http_code: 400,
            },
          ],
        });
      }

      try {
        await deleteFileService(publicId);
      } catch (e) {
        const err = e as UploadApiErrorResponse;
        throw error(400, {
          message: "Image deletion failed",
          data: null,
          errors: [
            {
              message: err.message,
              code: "BAD_REQUEST",
              http_code: err.http_code,
            },
          ],
        });
      }
    },
    {
      body: t.Object({
        url: t.String({ error: "Image URL is required", format: "url" }),
      }),
      response: {
        204: t.Null(),
        400: t.Object({
          message: t.String(),
          data: t.Null(),
          errors: t.Array(
            t.Object({
              message: t.String(),
              code: t.String(),
              http_code: t.Number(),
            }),
          ),
        }),
      },
      auth: true,
    },
  );
