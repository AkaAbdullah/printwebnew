type Template = {
  id: number;
  key: string;
  titles: string[];
  template: string;
};

export const getTemplatesForCharacters = (
  selectedTitles: string[],
  templates: Template[]
): Template[] => {
  return templates.filter((template) => {
    const sel = [...selectedTitles].sort().join(",");
    const tpl = [...template.titles].sort().join(",");
    return sel === tpl;
  });
};
