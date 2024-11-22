import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { Schema } from "zod";
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
  DialogTrigger,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

import { SectionProps } from "../types";

export function EmploymentHistory(props: SectionProps) {
  const methods = useFormContext<Schema>();

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.employments`,
  });

  function jobTitle(index: number) {
    return methods.watch(
      `sections.${props.index}.employments.${index}.jobTitle`
    );
  }

  function company(index: number) {
    return methods.watch(
      `sections.${props.index}.employments.${index}.company`
    );
  }

  function startDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.employments.${index}.startDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function endDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.employments.${index}.endDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function createEmployment() {
    append({
      company: "",
      jobTitle: "",
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
          A varied work history on your resume highlights the distinct expertise
          and insights you offer to a role.
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
                        {jobTitle(index) || "(Not specified)"}&nbsp;
                        {jobTitle(index) &&
                          company(index) &&
                          `at ${company(index)}`}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {startDate(index) && endDate(index)
                          ? `${startDate(index)} - ${endDate(index)}`
                          : "June 2022 - Present"}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>Edit employment</DialogTitle>
                      <DialogDescription>
                        {jobTitle(index) || "(Not specified)"}&nbsp;
                        {jobTitle(index) &&
                          company(index) &&
                          `at ${company(index)}`}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.employments.${index}.jobTitle`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Job Title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.employments.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.employments.${index}.startDate`}
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
                        name={`sections.${props.index}.employments.${index}.endDate`}
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
                      name={`sections.${props.index}.employments.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <TextEditor
                              onChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Managed team projects, coordinated client meetings, and analyzed sales data."
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
                            Would you like to remove this employment?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The employment &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.employments.${index}.jobTitle`
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
        onClick={createEmployment}
        className="self-start"
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more employments
      </Button>
    </section>
  );
}
