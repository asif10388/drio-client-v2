import { createSlice } from "@reduxjs/toolkit";

type OutboundContractSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: OutboundContractSlice = {
  rows: [
    {
      id: "1",
      ou: "Dealer.com",
      dataset: "B Bank",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      dateOfApproval: "Pending",
      frequency: 25,
      alerts: 8,
    },
    {
      id: "2",
      ou: "Kelly Blue Book",
      dataset: "IRS",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      dateOfApproval: "12/11/2023",
      frequency: 25,
      alerts: 8,
    },
    {
      id: "3",
      ou: "Cox Automotive",
      dataset: "Accidents",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      dateOfApproval: "Rejected",
      frequency: 25,
      alerts: 8,
    },
    {
      id: "4",
      ou: "Vin Solutions",
      dataset: "Service Record",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      dateOfApproval: "12/11/2023",
      frequency: 25,
      alerts: 8,
    },
  ],
  selectedRows: [],
};

const outboundContractSlice = createSlice({
  name: "outboundContract",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = outboundContractSlice.actions;

export default outboundContractSlice.reducer;
