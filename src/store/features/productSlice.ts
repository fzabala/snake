import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorResponseType, ProductModelType } from "../../types";
import { productsIndexService } from "../../services";
import { normalizeAxiosError } from "./utils";

interface ProductState {
  loading: boolean;
  fetchError?: ErrorResponseType;
  products: ProductModelType[];
}

const initialState: ProductState = {
  loading: false,
  products: [],
};

export const fetchProducts = createAsyncThunk<
  ProductModelType[],
  void,
  {
    rejectValue: ErrorResponseType;
  }
>("product/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await productsIndexService();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(normalizeAxiosError(err));
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.fetchError = undefined;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.fetchError = action.payload;
    });
  },
});
