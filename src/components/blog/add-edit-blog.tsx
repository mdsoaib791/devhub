"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader as DialogHeaderUI, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddBlog, useUpdateBlog } from "@/hooks/services-hook/use-blog.service.hook";
import type { BlogModel } from "@/models/blog.model";
import { blogValidationSchema } from "@/validation-schema/blog.validation.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
    onSuccess && onSuccess();
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
    onCancel && onCancel();
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
        { onSuccess: handleSuccess }
      );
    } else {
      addBlog.mutate(
        {
          ...data,
          userId,
          createdAt: now,
          updatedAt: now,
        },
        { onSuccess: handleSuccess }
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
      <DialogContent className="max-w-xl w-full">
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
                        <Textarea placeholder="Content" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
