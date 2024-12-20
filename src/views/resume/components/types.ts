import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { Schema } from "../utils/schemas";
import { FONT_SIZE_MAP } from "../constants/fonts";

export type SectionProps = {
  index: number;
  remove: UseFieldArrayRemove;
  methods: UseFormReturn<Schema>;
};

export type TemplateProps = {
  data: Schema;
};
export type SkillLevelProps = {
  level: string;
  fontSize: (typeof FONT_SIZE_MAP)[keyof typeof FONT_SIZE_MAP];
};

export type ResumeFormProps = {
  methods: UseFormReturn<Schema>;
};
