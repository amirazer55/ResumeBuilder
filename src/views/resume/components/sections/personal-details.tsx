import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  DatePicker,
  TextEditor,
} from "@/components/ui";
import { ChevronsUpDownIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Schema } from "zod";
import { SectionProps } from "../types";

export function PersonalDetails(props: SectionProps) {
  const methods = useFormContext<Schema>();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xl font-medium">
        {methods.watch(`sections.${props.index}.title`)}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <FormField
          control={methods.control}
          name={`sections.${props.index}.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.country`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="space-x-2">
            <span>Edit additional details</span>
            <ChevronsUpDownIcon className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <FormField
              control={methods.control}
              name={`sections.${props.index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.postalCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.drivingLicense`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving License</FormLabel>
                  <FormControl>
                    <Input placeholder="Driving License" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.nationality`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationality" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.placeOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Birth" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.dateOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      setSelectedDate={field.onChange}
                      selectedDate={field.value ?? undefined}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <FormField
        control={methods.control}
        name={`sections.${props.index}.summary`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <TextEditor
                onChange={field.onChange}
                defaultValue={field.value}
                placeholder="Summarize your qualifications and strengths in 2-3 sentences."
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}
