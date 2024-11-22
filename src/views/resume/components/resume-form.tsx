import { useFieldArray } from "react-hook-form";
import { GlobeIcon, PencilRulerIcon } from "lucide-react";
import { Form, Button } from "@/components/ui";

import {
  PersonalDetails,
  Skills,
  Educations,
  EmploymentHistory,
  Languages,
} from "./sections";

import { ResumeFormProps } from "./types";

const SECTIONS = {
  personalDetails: PersonalDetails,
  skills: Skills,
  educations: Educations,
  employmentHistory: EmploymentHistory,
  languages: Languages,
};

export default function ResumeForm(props: ResumeFormProps) {
  const { methods } = props;

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "sections",
  });

  return (
    <div className="px-6 py-8 sm:px-12 flex flex-col">
      <Form {...methods}>
        <form className="flex flex-col gap-12">
          {fields.map((field, index) => {
            const Section = SECTIONS[field.type];
            return <Section index={index} key={field.id} remove={remove} />;
          })}
          <section className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-medium">Add sections</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                size="lg"
                onClick={() =>
                  append({
                    type: "skills",
                    skills: [],
                    title: "Skills",
                  })
                }
              >
                <PencilRulerIcon className="w-4 h-4 mr-2" />
                Skills
              </Button>
              <Button
                variant="outline"
                type="button"
                size="lg"
                disabled={fields.some((field) => field.type === "languages")}
                onClick={() =>
                  append({
                    type: "languages",
                    languages: [],
                    title: "Languages",
                  })
                }
              >
                <GlobeIcon className="w-4 h-4 mr-2" />
                Languages
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
