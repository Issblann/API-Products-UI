import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import axios from 'axios';
import { RootState } from './store';

const ITEMS_PER_PAGE = 10;

interface initialPagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface ProductState {
  data: Product[];
  loading: boolean;
  error: boolean | null | string | undefined;
  pagination: initialPagination;
}

interface FetchProductsPayload {
  products: Product[];
  totalItems: number;
}
const initialPagination: initialPagination = {
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
};

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
  pagination: initialPagination,
};

export const fetchProducts = createAsyncThunk<FetchProductsPayload>(
  'products/fetchProducts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    try {
      const { currentPage } = state.products.pagination;
    
      const response = await axios.get(
        `http://localhost:8080/api/products?page=${currentPage}&pageSize=${ITEMS_PER_PAGE}`,
        { withCredentials: true }
      );

      if (!response.data) {
        throw new Error('Failed to fetch products');
      }

      console.log(currentPage, 'current page redux');

      console.log(response.data, 'response data redux');
      const products = response.data;
      const totalItems = 70;
      return { products, totalItems };
    } catch (error) {
      throw new Error('Error getting products redux');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<FetchProductsPayload>) => {
          state.loading = false;
          state.data = action.payload.products;
          state.pagination.totalItems = action.payload.totalItems;
          state.pagination.totalPages = Math.ceil(
            action.payload.totalItems / ITEMS_PER_PAGE
          );
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
