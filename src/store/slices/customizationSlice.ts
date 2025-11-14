// store/slices/customizationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Character {
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
    [characterId: number]: CharacterCustomization;
  };
  activeCharacterId: number | null;
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
      const id = character.id;

      if (!state.customizations[id]) {
        state.customizations[id] = {
          character,
          head: { style: null, color: null, imageUrl: null, metaData: null },
          hair: { style: null, color: null, imageUrl: null, metaData: null },
          shirt: { style: null, color: null, imageUrl: null, metaData: null },
          jeans: { style: null, color: null, imageUrl: null, metaData: null },
          // position/scale left undefined to allow CanvasEditor to compute default values
          zIndex: id,
        };
      } else {
        state.customizations[id].character = character;
      }

      state.activeCharacterId = id;
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
      const id = state.activeCharacterId;
      if (!state.customizations[id]) return;

      const customization = state.customizations[id].head;
      state.customizations[id].head = {
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
      const id = state.activeCharacterId;
      if (!state.customizations[id]) return;

      const customization = state.customizations[id].hair;
      state.customizations[id].hair = {
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
      const id = state.activeCharacterId;
      if (!state.customizations[id]) return;

      const customization = state.customizations[id].shirt;
      state.customizations[id].shirt = {
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
      const id = state.activeCharacterId;
      if (!state.customizations[id]) return;

      const customization = state.customizations[id].jeans;
      state.customizations[id].jeans = {
        style: action.payload.style ?? customization.style,
        color: action.payload.color ?? customization.color,
        imageUrl: action.payload.imageUrl ?? customization.imageUrl,
        metaData: action.payload.metaData ?? customization.metaData,
      };
    },

    setCharacterPosition: (
      state,
      action: PayloadAction<{ id: number; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      if (!state.customizations[id]) return;
      state.customizations[id].position = { x, y };
    },

    setCharacterScale: (
      state,
      action: PayloadAction<{ id: number; scale: number }>
    ) => {
      const { id, scale } = action.payload;
      if (!state.customizations[id]) return;
      state.customizations[id].scale = scale;
      state.customizations[id].scaleNormalized = true;
    },

    setCharacterZIndex: (
      state,
      action: PayloadAction<{ id: number; zIndex: number }>
    ) => {
      const { id, zIndex } = action.payload;
      if (!state.customizations[id]) return;
      state.customizations[id].zIndex = zIndex;
    },
    setCharacterVisible: (
      state,
      action: PayloadAction<{ id: number; visible: boolean }>
    ) => {
      const { id, visible } = action.payload;
      if (!state.customizations[id]) return;
      state.customizations[id].visibleOnCanvas = visible;
    },

    clearCharacterCustomization: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      delete state.customizations[action.payload.id];
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
