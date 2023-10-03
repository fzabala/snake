import { rest } from "msw";
import { ProductModelType } from "../../../types";

const mockProducts: ProductModelType[] = [
  {
    id: 1,
    name: "product one name",
    description: "product one long description",
    price: 100,
  },
  {
    id: 2,
    name: "product two name",
    description: "product two long description",
    price: 101,
  },
];

const indexProductUrl = `${process.env.REACT_APP_API_HOST}/products`;

const indexProductHandler = rest.get(indexProductUrl, async (req, res, ctx) =>
  res(ctx.json({ data: mockProducts }))
);

export const tasksHandlerException = rest.get(
  indexProductUrl,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: "Something went wrong" }))
);

export const tasksHandlerValidationError = rest.get(
  indexProductUrl,
  async (req, res, ctx) =>
    res(
      ctx.status(412),
      ctx.json({
        message: "Validation errors",
        errors: [{ field: "some-field", message: "some-error" }],
      })
    )
);

export const handlers = [indexProductHandler];
