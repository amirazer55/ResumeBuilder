import React from "react";
import { Trash2Icon, MoreVerticalIcon, PlusIcon } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  RadioGroup,
  RadioGroupItem,
  AlertDialogHeader,
  AlertDialogFooter,
  DialogHeader,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  DialogFooter,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import { SectionProps } from "../../types";
import { Schema } from "@/views/resume/utils/schemas";

export function Skills(props: SectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const methods = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.skills`,
  });

  function createSkill() {
    append({ level: "novice", name: "" });
    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium">
            {methods.watch(`sections.${props.index}.title`)}
          </h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Would you like to delete this section?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This section will be permanently
                  removed from your resume.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => props.remove(props.index)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-sm text-muted-foreground">
          Select 5 relevant skills that align with the job requirements. Ensure
          they resonate with the key skills highlighted in the job post,
          especially for online applications.
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
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.name`
                        ) || "(Not specified)"}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.level`
                        )}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit skill</DialogTitle>
                      <DialogDescription>
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.name`
                        ) || "(Not specified)"}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.skills.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Level -{" "}
                            <span className="text-muted-foreground font-normal capitalize">
                              {methods.watch(
                                `sections.${props.index}.skills.${index}.level`
                              )}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="novice"
                                    className={cn({
                                      "bg-primary": [
                                        "novice",
                                        "beginner",
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="beginner"
                                    className={cn({
                                      "bg-primary": [
                                        "beginner",
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="intermediate"
                                    className={cn({
                                      "bg-primary": [
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="advanced"
                                    className={cn({
                                      "bg-primary": [
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="expert"
                                    className={cn({
                                      "bg-primary": ["expert"].includes(
                                        field.value
                                      ),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                            </RadioGroup>
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
                            Would you like to remove this skill?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The skill &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.skills.${index}.name`
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
        className="self-start"
        onClick={createSkill}
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more skills
      </Button>
    </section>
  );
}
