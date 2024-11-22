import React, { useEffect, useMemo, useRef, useState } from "react";
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
      title: "Educations",
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
    let result = null;

    try {
      result = schema.parse(JSON.parse(localStorage.getItem("resume") || ""));
    } catch (error) {
      console.error({ error });
      result = defaultValues;
    }

    return result;
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
