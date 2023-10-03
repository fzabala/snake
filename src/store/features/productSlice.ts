import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorResponseType, ProductModelType } from "../../types";
import { productsIndexService } from "../../services";
import axios, { AxiosError } from "axios";

// Define a type for the slice state
interface ProductState {
  loading: boolean;
  fetchError?: ErrorResponseType;
  products: ProductModelType[];
}

// Define the initial state using that type
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
    if(axios.isAxiosError(err) && err.response?.data){
      return thunkAPI.rejectWithValue((err.response.data as ErrorResponseType));
    }
    return thunkAPI.rejectWithValue(err as ErrorResponseType);
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
