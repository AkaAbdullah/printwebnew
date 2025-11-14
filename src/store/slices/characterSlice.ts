// store/slices/characterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { charactersList, type CharacterData } from "../../utils/characters";

export type SelectedCharacter = CharacterData & {
  name: string;
  color: string;
};

interface CharacterState {
  characters: CharacterData[];
  selectedCharacters: SelectedCharacter[];
}

const initialState: CharacterState = {
  characters: charactersList,
  selectedCharacters: [],
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

      if (baseChar && !state.selectedCharacters.some((c) => c.id === id)) {
        state.selectedCharacters.push({ ...baseChar, name, color });
      }
    },

    updateCharacterName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const char = state.selectedCharacters.find(
        (c) => c.id === action.payload.id
      );
      if (char) char.name = action.payload.name;
    },

    updateCharacterColor: (
      state,
      action: PayloadAction<{ id: number; color: string }>
    ) => {
      const char = state.selectedCharacters.find(
        (c) => c.id === action.payload.id
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

    removeCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (c) => c.id !== action.payload
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
  removeCharacter,
  clearAllCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;
