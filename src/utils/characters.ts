// utils/characters.ts

import { mediaData } from "./mediaData";

export type CharacterData = {
  id: number;
  title: string;
  png: string;
  metaData: string;
};

export const charactersList: CharacterData[] = [
  {
    id: 1,
    title: "girl",
    png: mediaData.newGirl,
    metaData: "adult female character",
  },
  {
    id: 2,
    title: "boy",
    png: mediaData.newMale,
    metaData: "adult male character",
  },
  {
    id: 3,
    title: "child",
    png: mediaData.newChild2,
    metaData: "male child character",
  },
  {
    id: 4,
    title: "dog",
    png: mediaData.dogPng,
    metaData: "pet dog character",
  },
];
