import { createSlice } from "@reduxjs/toolkit";
import { UseDisclosureProps } from "@chakra-ui/react";

interface PanelProps extends UseDisclosureProps {
  nodeID?: string;
}

const initialState: PanelProps = { isOpen: false };

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    onToggle: (state, { payload }) => {
      if (typeof payload.isOpen === "boolean") {
        state.isOpen = payload.isOpen;
      } else if (payload.isOpen === "SWITCH") {
        state.isOpen = !state.isOpen;
      }

      if (state.isOpen) state.nodeID = payload.nodeID;
    },
  },
  selectors: {
    checkOpen: (state) => {
      return state;
    },
  },
});
export default panelSlice.reducer;

export const { onToggle } = panelSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { checkOpen } = panelSlice.selectors;
