import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Schema } from "zod";
import { format } from "date-fns";
import { MoreVerticalIcon, Trash2Icon, PlusIcon } from "lucide-react";
import {
  DialogHeader,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  MonthPicker,
  TextEditor,
  DialogFooter,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DialogContent,
  DropdownMenuTrigger,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogDescription,
  DropdownMenuContent,
  Dialog,
  AlertDialog,
  AlertDialogTrigger,
  DropdownMenuItem,
  AlertDialogContent,
} from "@/components/ui";

import { SectionProps } from "../types";

export function Educations(props: SectionProps) {
  const methods = useFormContext<Schema>();

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const { fields, remove, append } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.educations`,
  });

  function school(index: number) {
    return methods.watch(`sections.${props.index}.educations.${index}.school`);
  }

  function degree(index: number) {
    return methods.watch(`sections.${props.index}.educations.${index}.degree`);
  }

  function startDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.educations.${index}.startDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function endDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.educations.${index}.endDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function createEducation() {
    append({
      degree: "",
      school: "",
      startDate: null,
      endDate: null,
      description: "",
    });

    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium">
          {methods.watch(`sections.${props.index}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground">
          A diverse educational background on your resume underscores the unique
          value and perspective you bring to a position.
        </p>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Dialog defaultOpen={index === openIndex}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-1 flex-col h-auto items-start min-w-0"
                    >
                      <span className="min-w-0 text-ellipsis overflow-hidden whitespace-nowrap block max-w-full">
                        {degree(index) || "(Not specified)"}&nbsp;
                        {degree(index) &&
                          school(index) &&
                          `at ${school(index)}`}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {startDate(index) && endDate(index)
                          ? `${startDate(index)} - ${endDate(index)}`
                          : "June 2022 - Present"}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit education</DialogTitle>
                      <DialogDescription>
                        {degree(index) || "(Not specified)"}&nbsp;
                        {degree(index) &&
                          school(index) &&
                          `at ${school(index)}`}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.school`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School</FormLabel>
                          <FormControl>
                            <Input placeholder="School" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Degree" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.educations.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.educations.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <TextEditor
                              onChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Bachelor of Science in Computer Engineering."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" type="button">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Would you like to remove this education?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The education &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.educations.${index}.degree`
                              ) || "(Not specified)"}
                            </span>
                            &nbsp; will be permanently removed from your resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      <Button
        variant="outline"
        type="button"
        onClick={createEducation}
        className="self-start"
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more educations
      </Button>
    </section>
  );
}
