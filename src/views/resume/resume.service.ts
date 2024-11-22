import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { useBreakpoint } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, Schema } from "./utils/schemas";

const defaultValues: Schema = {
  sections: [
    {
      title: "Personal Details",
      type: "personalDetails",
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      postalCode: "",
      drivingLicense: "",
      dateOfBirth: null,
      placeOfBirth: "",
      nationality: "",
      address: "",
      email: "",
      phone: "",
      summary: "",
      wantedJobTitle: "",
    },
    {
      title: "Skills",
      type: "skills",
      skills: [],
    },
    {
      title: "Education",
      type: "educations",
      educations: [],
    },
    {
      title: "Employment History",
      type: "employmentHistory",
      employments: [],
    },
  ],
  settings: {
    fontFamily: "courier",
    fontSize: "12",
  },
};

export const useResumeService = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const isLargeScreen = useBreakpoint("lg");

  const createDefaultValues = useMemo(() => {
    try {
      const savedData = localStorage.getItem("resume");
      if (savedData) {
        return schema.parse(JSON.parse(savedData));
      }
    } catch (error) {
      console.warn(
        "Failed to parse saved resume data. Falling back to defaults.",
        error
      );
    }
    return defaultValues; // Fallback to default values
  }, []);

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultValues,
  });

  const formData = methods.watch();

  const autoSave = useRef(
    debounce((data: Schema) => {
      localStorage.setItem("resume", JSON.stringify(data));
    }, 1000)
  );

  useEffect(() => {
    autoSave.current(formData);
  }, [formData]);

  useEffect(() => {
    return () => {
      autoSave.current.cancel(); // Cleanup debounce on unmount
    };
  }, []);

  return {
    showPreview,
    setShowPreview,
    showSettings,
    setShowSettings,
    isLargeScreen,
    methods,
    formData,
  };
};
