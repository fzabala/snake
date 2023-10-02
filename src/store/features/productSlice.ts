import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
  ErrorResponseType,
  ProductModelType,
} from '../../types';
import { productsIndexService } from '../services';


// Define a type for the slice state
interface ProductState {
  isIndexFetching: boolean;
  indexErrorMessage?: string;
  products: ProductModelType[];
}

// Define the initial state using that type
const initialState: ProductState = {
  isIndexFetching: false,
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setIndexFetching: (state: ProductState) => {
      state.isIndexFetching = true;
      state.indexErrorMessage = undefined;
    },
    setIndexFetchingSuccess: (
      state: ProductState,
      action: PayloadAction<ProductModelType[]>
    ) => {
      state.isIndexFetching = false;
      state.products = action.payload;
    },
    setIndexFetchingError: (state: ProductState, action: PayloadAction<ErrorResponseType>) => {
      state.isIndexFetching = false;
      state.indexErrorMessage = action.payload.message;
    },
  },
});

const { setIndexFetching, setIndexFetchingSuccess, setIndexFetchingError } = productSlice.actions;

export const productIndexAction = () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(setIndexFetching());
    try {
      const response = await productsIndexService();
      dispatch(setIndexFetchingSuccess(response.data));
    } catch (err) {
      dispatch(setIndexFetchingError(err as ErrorResponseType));
    }
  };
