// store/slices/characterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { charactersList, type CharacterData } from "../../utils/characters";

export type SelectedCharacter = CharacterData & {
  uniqueId: string;
  name: string;
  color: string;
};

interface CharacterState {
  characters: CharacterData[];
  selectedCharacters: SelectedCharacter[];
  generatedImages?: {
    [id: number]: string;
  };
}

const initialState: CharacterState = {
  characters: charactersList,
  selectedCharacters: [],
  generatedImages: {},
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addCharacter: (
      state,
      action: PayloadAction<{ id: number; name?: string; color?: string }>
    ) => {
      const { id, name = "", color = "#ccc" } = action.payload;
      const baseChar = state.characters.find((c) => c.id === id);

      if (baseChar) {
        const uniqueId = `${id}-${Date.now()}-${Math.random()}`;
        state.selectedCharacters.push({ ...baseChar, uniqueId, name, color });
      }
    },

    updateCharacterName: (
      state,
      action: PayloadAction<{ uniqueId: string; name: string }>
    ) => {
      const char = state.selectedCharacters.find(
        (c) => c.uniqueId === action.payload.uniqueId
      );
      if (char) char.name = action.payload.name;
    },

    updateCharacterColor: (
      state,
      action: PayloadAction<{ uniqueId: string; color: string }>
    ) => {
      const char = state.selectedCharacters.find(
        (c) => c.uniqueId === action.payload.uniqueId
      );
      if (char) char.color = action.payload.color;
    },

    updateCharacterImage: (
      state,
      action: PayloadAction<{ id: number; png: string }>
    ) => {
      const char = state.selectedCharacters.find(
        (c) => c.id === action.payload.id
      );
      if (char) char.png = action.payload.png;
    },
    setGeneratedCharacterImage: (
      state,
      action: PayloadAction<{ id: number; png: string }>
    ) => {
      if (!state.generatedImages) state.generatedImages = {};
      state.generatedImages[action.payload.id] = action.payload.png;
    },

    removeGeneratedCharacterImage: (state, action: PayloadAction<number>) => {
      if (!state.generatedImages) return;
      delete state.generatedImages[action.payload];
    },

    removeCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (c) => c.uniqueId !== action.payload
      );
    },

    clearAllCharacters: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const {
  addCharacter,
  updateCharacterName,
  updateCharacterColor,
  updateCharacterImage,
  setGeneratedCharacterImage,
  removeGeneratedCharacterImage,
  removeCharacter,
  clearAllCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;
