import { svgData } from "./svgData";

export type Template = {
  id: number;
  key: string;
  titles: string[];
  template: string; // kept for backwards compat
  image: string; // new property (same as template url)
  noOfCharactersInTemplate: number;
};

export const templateList: Template[] = [
  {
    id: 1,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate1,
    image: svgData.FourcharacterTemplate1,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 2,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate2,
    image: svgData.FourcharacterTemplate2,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 3,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate3,
    image: svgData.FourcharacterTemplate3,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 4,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate4,
    image: svgData.FourcharacterTemplate4,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 5,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate5,
    image: svgData.FourcharacterTemplate5,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 6,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate6,
    image: svgData.FourcharacterTemplate6,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 7,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate7,
    image: svgData.FourcharacterTemplate7,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 8,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate8,
    image: svgData.FourcharacterTemplate8,
    noOfCharactersInTemplate: 4,
  },
  {
    id: 9,
    key: "4char",
    titles: ["girl", "boy", "dog", "child"],
    template: svgData.FourcharacterTemplate9,
    image: svgData.FourcharacterTemplate9,
    noOfCharactersInTemplate: 4,
  },

  {
    id: 11,
    key: "3char",
    titles: ["girl", "boy", "child"],
    template: svgData.FourcharacterTemplate9,
    image: svgData.FourcharacterTemplate9,
    noOfCharactersInTemplate: 3,
  },
  {
    id: 12,
    key: "3char",
    titles: ["girl", "boy", "child"],
    template: svgData.FourcharacterTemplate9,
    image: svgData.FourcharacterTemplate9,
    noOfCharactersInTemplate: 3,
  },
  {
    id: 13,
    key: "3char",
    titles: ["girl", "boy", "child"],
    template: svgData.FourcharacterTemplate9,
    image: svgData.FourcharacterTemplate9,
    noOfCharactersInTemplate: 3,
  },

  {
    id: 10,
    key: "1char",
    titles: ["girl"],
    template: svgData.testTemplate,
    image: svgData.testTemplate,
    noOfCharactersInTemplate: 1,
  },
];
