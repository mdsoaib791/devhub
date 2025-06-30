"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader as DialogHeaderUI, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAddBlog, useUpdateBlog } from "@/hooks/services-hook/use-blog.service.hook";
import { useToast } from "@/hooks/use-toast";
import type { BlogModel } from "@/models/blog.model";
import { blogValidationSchema } from "@/validation-schema/blog.validation.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MarkdownEditor from "../common/markdown-editor";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface AddEditBlogProps {
  userId: string;
  blog?: BlogModel;
  onSuccess?: () => void;
  onCancel?: () => void;
  triggerLabel?: string; // If provided, renders a button to open dialog
  open?: boolean; // Optional: controlled dialog
  onOpenChange?: (open: boolean) => void; // Optional: controlled dialog
}

export default function AddEditBlog({
  userId,
  blog,
  onSuccess,
  onCancel,
  triggerLabel,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AddEditBlogProps) {
  const isEdit = !!blog;
  const addBlog = useAddBlog();
  const updateBlog = useUpdateBlog();
  const { toast } = useToast();

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const form = useForm<BlogModel>({
    resolver: yupResolver(blogValidationSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      userId: blog?.userId || userId || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control,
  } = form;

  const handleSuccess = () => {
    reset();
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
    onCancel?.();
  };

  const onSubmit = (data: BlogModel) => {
    const now = moment().toISOString();
    if (isEdit && blog?.id) {
      updateBlog.mutate(
        {
          id: blog.id,
          model: {
            ...blog,
            ...data,
            updatedAt: now,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Blog updated!",
              description: "Your blog was updated successfully.",
              variant: "success",
            });
            handleSuccess();
          },
          onError: () => {
            toast({
              title: "Update failed",
              description: "Something went wrong.",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      addBlog.mutate(
        {
          ...data,
          userId,
          createdAt: now,
          updatedAt: now,
        },
        {
          onSuccess: () => {
            toast({
              title: "Blog added!",
              description: "Your blog was added successfully.",
              variant: "success",
            });
            handleSuccess();
          },
          onError: () => {
            toast({
              title: "Add failed",
              description: "Something went wrong.",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button>{triggerLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-xl w-full overflow-y-auto">
        <DialogHeaderUI>
          <DialogTitle>{isEdit ? "Edit Blog" : "Add Blog"}</DialogTitle>
        </DialogHeaderUI>
        <Card className="shadow-none border-none p-0">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="flex flex-col gap-4 p-0">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <div className="grid md:grid-cols-2 gap-4">

                          <Textarea
                            placeholder="Write your markdown content..."
                            {...field}
                            rows={10}
                            className="h-full"
                            disabled={isSubmitting}
                          />


                          <div className="border rounded-md p-4 overflow-y-auto max-h-[300px] bg-muted/40">
                            <MarkdownEditor content={field.value} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hidden userId field */}
                <input type="hidden" {...form.register("userId")} />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isEdit ? "Save" : "Add"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </form>
          </FormProvider>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
