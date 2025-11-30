// store/slices/customizationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Character {
  uniqueId: string;
  color: string;
  id: number;
  name: string;
  png: string;
  title: string;
}

interface CustomizationOption {
  style: string | null;
  color: string | null;
  imageUrl: string | null;
  metaData: string | null;
}

interface CharacterCustomization {
  character: Character;
  head: CustomizationOption;
  hair: CustomizationOption;
  shirt: CustomizationOption;
  jeans: CustomizationOption;
  // new transform info for canvas editor
  position?: { x: number; y: number };
  scale?: number;
  zIndex?: number;
  visibleOnCanvas?: boolean;
  scaleNormalized?: boolean;
}

interface CustomizationState {
  customizations: {
    [characterUniqueId: string]: CharacterCustomization;
  };
  activeCharacterId: string | null;
}

const initialState: CustomizationState = {
  customizations: {},
  activeCharacterId: null,
};

const customizationSlice = createSlice({
  name: "customizationSlice",
  initialState,
  reducers: {
    setActiveCharacter: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const uniqueId = character.uniqueId;

      if (!state.customizations[uniqueId]) {
        state.customizations[uniqueId] = {
          character,
          head: { style: null, color: null, imageUrl: null, metaData: null },
          hair: { style: null, color: null, imageUrl: null, metaData: null },
          shirt: { style: null, color: null, imageUrl: null, metaData: null },
          jeans: { style: null, color: null, imageUrl: null, metaData: null },
          // position/scale left undefined to allow CanvasEditor to compute default values
          zIndex: character.id,
        };
      } else {
        state.customizations[uniqueId].character = character;
      }

      state.activeCharacterId = uniqueId;
    },

    setHead: (
      state,
      action: PayloadAction<{
        style?: string;
        color?: string;
        imageUrl?: string;
        metaData?: string;
      }>
    ) => {
      if (state.activeCharacterId === null) return;
      const uniqueId = state.activeCharacterId;
      if (!state.customizations[uniqueId]) return;

      const customization = state.customizations[uniqueId].head;
      state.customizations[uniqueId].head = {
        style: action.payload.style ?? customization.style,
        color: action.payload.color ?? customization.color,
        imageUrl: action.payload.imageUrl ?? customization.imageUrl,
        metaData: action.payload.metaData ?? customization.metaData,
      };
    },

    setHair: (
      state,
      action: PayloadAction<{
        style?: string;
        color?: string;
        imageUrl?: string;
        metaData?: string;
      }>
    ) => {
      if (state.activeCharacterId === null) return;
      const uniqueId = state.activeCharacterId;
      if (!state.customizations[uniqueId]) return;

      const customization = state.customizations[uniqueId].hair;
      state.customizations[uniqueId].hair = {
        style: action.payload.style ?? customization.style,
        color: action.payload.color ?? customization.color,
        imageUrl: action.payload.imageUrl ?? customization.imageUrl,
        metaData: action.payload.metaData ?? customization.metaData,
      };
    },

    setShirt: (
      state,
      action: PayloadAction<{
        style?: string;
        color?: string;
        imageUrl?: string;
        metaData?: string;
      }>
    ) => {
      if (state.activeCharacterId === null) return;
      const uniqueId = state.activeCharacterId;
      if (!state.customizations[uniqueId]) return;

      const customization = state.customizations[uniqueId].shirt;
      state.customizations[uniqueId].shirt = {
        style: action.payload.style ?? customization.style,
        color: action.payload.color ?? customization.color,
        imageUrl: action.payload.imageUrl ?? customization.imageUrl,
        metaData: action.payload.metaData ?? customization.metaData,
      };
    },

    setJeans: (
      state,
      action: PayloadAction<{
        style?: string;
        color?: string;
        imageUrl?: string;
        metaData?: string;
      }>
    ) => {
      if (state.activeCharacterId === null) return;
      const uniqueId = state.activeCharacterId;
      if (!state.customizations[uniqueId]) return;

      const customization = state.customizations[uniqueId].jeans;
      state.customizations[uniqueId].jeans = {
        style: action.payload.style ?? customization.style,
        color: action.payload.color ?? customization.color,
        imageUrl: action.payload.imageUrl ?? customization.imageUrl,
        metaData: action.payload.metaData ?? customization.metaData,
      };
    },

    setCharacterPosition: (
      state,
      action: PayloadAction<{ uniqueId: string; x: number; y: number }>
    ) => {
      const { uniqueId, x, y } = action.payload;
      if (!state.customizations[uniqueId]) return;
      state.customizations[uniqueId].position = { x, y };
    },

    setCharacterScale: (
      state,
      action: PayloadAction<{ uniqueId: string; scale: number }>
    ) => {
      const { uniqueId, scale } = action.payload;
      if (!state.customizations[uniqueId]) return;
      state.customizations[uniqueId].scale = scale;
      state.customizations[uniqueId].scaleNormalized = true;
    },

    setCharacterZIndex: (
      state,
      action: PayloadAction<{ uniqueId: string; zIndex: number }>
    ) => {
      const { uniqueId, zIndex } = action.payload;
      if (!state.customizations[uniqueId]) return;
      state.customizations[uniqueId].zIndex = zIndex;
    },
    setCharacterVisible: (
      state,
      action: PayloadAction<{ uniqueId: string; visible: boolean }>
    ) => {
      const { uniqueId, visible } = action.payload;
      if (!state.customizations[uniqueId]) return;
      state.customizations[uniqueId].visibleOnCanvas = visible;
    },

    clearCharacterCustomization: (
      state,
      action: PayloadAction<{ uniqueId: string }>
    ) => {
      delete state.customizations[action.payload.uniqueId];
    },
    clearAllCustomizations: (state) => {
      state.customizations = {};
      state.activeCharacterId = null;
    },
  },
});

export const {
  setActiveCharacter,
  setHead,
  setHair,
  setShirt,
  setJeans,
  setCharacterPosition,
  setCharacterScale,
  setCharacterZIndex,
  setCharacterVisible,
  clearCharacterCustomization,
  clearAllCustomizations,
} = customizationSlice.actions;

export default customizationSlice.reducer;
