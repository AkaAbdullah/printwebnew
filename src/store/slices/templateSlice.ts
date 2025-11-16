import { createSlice } from "@reduxjs/toolkit";
import { mediaData } from "../../utils/mediaData";
import type { Template } from "../../utils/templates";

interface TemplateStates {
  selectedTemplate: Template | null;
  background: string | null;
  allBackgrounds: string[];
  combinedTemplate: string | null;
  finalComposedTemplate: string | null;
}
const initialState: TemplateStates = {
  selectedTemplate: null,
  background: null,
  combinedTemplate: null,
  finalComposedTemplate: null,
  allBackgrounds: [
    mediaData.background1,
    mediaData.background2,
    mediaData.background3,
    mediaData.background4,
    mediaData.background5,
    mediaData.background6,
    mediaData.background7,
    mediaData.background8,
    mediaData.background9,
  ],
};

const templateSlice = createSlice({
  name: "templateSlice",
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      state.combinedTemplate = null;
      state.finalComposedTemplate = null;
    },
    setTemplateBackground: (state, action) => {
      state.background = action.payload;
    },
    setCombinedTemplate: (state, action) => {
      state.combinedTemplate = action.payload;
      state.finalComposedTemplate = null;
    },
    setFinalComposedTemplate: (state, action) => {
      state.finalComposedTemplate = action.payload;
    },
    clearSelectedTemplate: (state) => {
      state.selectedTemplate = null;
      state.background = null;
      state.combinedTemplate = null;
      state.finalComposedTemplate = null;
    },
  },
});

export const {
  setSelectedTemplate,
  clearSelectedTemplate,
  setTemplateBackground,
  setCombinedTemplate,
  setFinalComposedTemplate,
} = templateSlice.actions;
export default templateSlice.reducer;
