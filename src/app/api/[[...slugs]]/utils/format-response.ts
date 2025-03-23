import { t, type TSchema } from "elysia";

export const formatResponseSchema = <SCHEMA extends TSchema>(
  responseSchema: SCHEMA,
  statusErrors?: number[],
) => {
  return {
    200: t.Object({
      path: t.String(),
      message: t.Optional(t.String()),
      data: responseSchema,
      status: t.Union([t.Number(), t.String()]),
      timeStamp: t.String(),
    }),
    ...(statusErrors?.reduce(
      (acc, status) => {
        acc[status] = t.Object({
          path: t.String(),
          message: t.Optional(t.String()),
          data: responseSchema,
          status: t.Union([t.Number(), t.String()]),
          timeStamp: t.String(),
        });
        return acc;
      },
      {} as Record<number, TSchema>,
    ) || {}),
  };
};
