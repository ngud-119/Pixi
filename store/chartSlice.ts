import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";
import jsonData from "@/public/jsonData.json";

const initialState: Object = jsonData;

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addNode: (state, { payload }) => {
      const parentID = payload.parentID;
      const newID = payload.newID;
      const newConnection = payload.newConnection;
      const newNode = payload.newNode;

      state[parentID]["ray"]["children"].push(newConnection);
      state[newID] = newNode;
    },

    removeNode: (state, { payload }) => {
      // idx already calculated in the main scene, just need to pass it here again
      const parentID = payload.parentID;
      const oldID = payload.oldID;
      const connectionIdx = payload.connectionIdx;
      if (parentID && connectionIdx !== -1) {
        const parentConnections = state[parentID]["ray"]["children"];
        parentConnections.splice(connectionIdx, 1);
      }
      delete state[oldID];
    },

    editNode: (state, { payload }) => {
      if (payload.title) {
        state[payload.id]["ray"]["content"]["title"] = payload.title;
      } else if (payload.description) {
        state[payload.id]["ray"]["content"]["description"] =
          payload.description;
      } else if (payload.image) {
        state[payload.id]["ray"]["content"]["image"] = payload.image;
      }
    },
  },
  selectors: {
    selectChart: (data) => data,
  },
});
export default chartSlice.reducer;

export const { addNode, removeNode, editNode } = chartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectChart } = chartSlice.selectors;
