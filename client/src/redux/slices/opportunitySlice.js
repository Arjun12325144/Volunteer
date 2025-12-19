import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { opportunityAPI } from '../../services/api';

const initialState = {
  opportunities: [],
  selectedOpportunity: null,
  loading: false,
  error: null,
  filters: {
    category: 'All',
    search: '',
    location: '',
  },
};

export const fetchOpportunities = createAsyncThunk(
  'opportunities/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await opportunityAPI.getAll(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOpportunityById = createAsyncThunk(
  'opportunities/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await opportunityAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpForOpportunity = createAsyncThunk(
  'opportunities/signUp',
  async (id, { rejectWithValue }) => {
    try {
      const response = await opportunityAPI.signUp(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelRegistration = createAsyncThunk(
  'opportunities/cancel',
  async (id, { rejectWithValue }) => {
    try {
      const response = await opportunityAPI.cancel(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const opportunitySlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedOpportunity: (state) => {
      state.selectedOpportunity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        state.opportunities = action.payload.opportunities;
      })
      .addCase(fetchOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch opportunities';
      })
      // Fetch By ID
      .addCase(fetchOpportunityById.fulfilled, (state, action) => {
        state.selectedOpportunity = action.payload.opportunity;
      })
      // Sign Up
      .addCase(signUpForOpportunity.fulfilled, (state, action) => {
        const index = state.opportunities.findIndex(
          (opp) => opp._id === action.payload.opportunity._id
        );
        if (index !== -1) {
          state.opportunities[index] = action.payload.opportunity;
        }
        if (state.selectedOpportunity) {
          state.selectedOpportunity = action.payload.opportunity;
        }
      });
  },
});

export const { setFilters, clearSelectedOpportunity } = opportunitySlice.actions;
export default opportunitySlice.reducer;