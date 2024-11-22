import React from "react";
import { DownloadIcon, FileTextIcon, Settings2Icon, XIcon } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFPreview } from "@/components/shared/pdf-preview";

import {
  DialogHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "@/components/ui";

import ResumeForm from "./components/resume-form";
import { Template } from "./components/template";
import { useResumeService } from "./resume.service";

export function Resume() {
  const {
    showPreview,
    setShowPreview,
    showSettings,
    setShowSettings,
    isLargeScreen,
    methods,
    formData,
  } = useResumeService();

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {(isLargeScreen || !showPreview) && (
        <div className="lg:flex-none flex-1 lg:basis-1/2 max-h-full lg:overflow-auto">
          <ResumeForm methods={methods} />
          <Button
            className="lg:hidden fixed right-8 bottom-8"
            onClick={() => setShowPreview(true)}
          >
            <FileTextIcon className="w-4 h-4 mr-2" /> Preview
          </Button>
        </div>
      )}
      {(isLargeScreen || showPreview) && (
        <div className="lg:relative h-full w-screen flex-none lg:basis-1/2 bg-muted">
          <div className="bg-primary text-white flex justify-between lg:hidden items-center p-2">
            <Button onClick={() => setShowSettings(true)} size="icon">
              <Settings2Icon className="w-5 h-5 mr-2" />
            </Button>
            <div className="mx-auto">
              <div className="flex gap-2">
                <PDFDownloadLink
                  document={<Template data={formData} />}
                  fileName="resume.pdf"
                >
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </PDFDownloadLink>
              </div>
            </div>
            <Button onClick={() => setShowPreview(false)} size="icon">
              <XIcon className="w-5 h-5 mr-2" />
            </Button>
          </div>
          <div className="overflow-hidden p-12 flex-1 space-y-12">
            <div className="hidden lg:flex justify-between max-w-2xl mx-auto">
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Settings2Icon className="w-4 h-4 mr-2" /> Template Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Template Customization Settings</DialogTitle>
                    <DialogDescription>
                      Adjust the fonts, colors, and other visual elements to
                      personalize your template.
                    </DialogDescription>
                    <Form {...methods}>
                      <div className="flex gap-2 sm:flex-row flex-col">
                        <FormField
                          control={methods.control}
                          name="settings.fontFamily"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Font Family</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select which font family to use" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="courier">
                                    Courier
                                  </SelectItem>
                                  <SelectItem value="helvetica">
                                    Helvetica
                                  </SelectItem>
                                  <SelectItem value="times-roman">
                                    Times Roman
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={methods.control}
                          name="settings.fontSize"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Font Size</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select which font size to use" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="10">10</SelectItem>
                                  <SelectItem value="12">12</SelectItem>
                                  <SelectItem value="14">14</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
                  </DialogHeader>
                  <DialogFooter />
                </DialogContent>
              </Dialog>

              <div className="flex gap-2">
                <PDFDownloadLink
                  document={<Template data={formData} />}
                  fileName="resume.pdf"
                >
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </PDFDownloadLink>
              </div>
            </div>
            <PDFPreview>
              <Template data={formData} />
            </PDFPreview>
          </div>
        </div>
      )}
    </div>
  );
}
