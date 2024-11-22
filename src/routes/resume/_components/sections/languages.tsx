import React from "react";
import { Trash2Icon, MoreVerticalIcon, PlusIcon } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Schema } from "zod";
import {
  Button,
  AlertDialogHeader,
  AlertDialogFooter,
  DialogHeader,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  DialogFooter,
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

import { SectionProps } from "../types";

export function Languages(props: SectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const methods = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.languages`,
  });

  function createLanguage() {
    append({ level: "basic", name: "" });
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
          List the languages you are proficient in, both spoken and written.
          Highlight any languages that are particularly relevant to the job you
          are applying for.
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
                          `sections.${props.index}.languages.${index}.name`
                        ) || "(Not specified)"}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {methods.watch(
                          `sections.${props.index}.languages.${index}.level`
                        )}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit language</DialogTitle>
                      <DialogDescription>
                        {methods.watch(
                          `sections.${props.index}.languages.${index}.name`
                        ) || "(Not specified)"}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.languages.${index}.name`}
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
                      name={`sections.${props.index}.languages.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Level -{" "}
                            <span className="text-muted-foreground font-normal capitalize">
                              {methods.watch(
                                `sections.${props.index}.languages.${index}.level`
                              )}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="native">Native</SelectItem>
                                <SelectItem value="fluent">Fluent</SelectItem>
                                <SelectItem value="intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="basic">Basic</SelectItem>
                              </SelectContent>
                            </Select>
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
                            Would you like to remove this language?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The language &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.languages.${index}.name`
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
        onClick={createLanguage}
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more languages
      </Button>
    </section>
  );
}
