'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useGetDeveloperByUserId, useUpdateDeveloper } from '@/hooks/services-hook/use-developer.service.hook';
import { useToast } from "@/hooks/use-toast";
import { DeveloperModel } from "@/models/developer.model";
import developerValidationSchema from '@/validation-schema/developer.validation.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsTwitterX } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import Loader from "../common/loader";

type Props = {
  onSuccess?: () => void;
};

export default function DeveloperUpdateForm({ onSuccess }: Props) {
  const { data: session } = useSession();
  const { data: developer, isLoading } = useGetDeveloperByUserId(session?.user?.id || '');
  const { mutate: updateDeveloper, isPending: isUpdating } = useUpdateDeveloper();
  const { toast } = useToast();
  // For skills input as comma separated string
  const [skillsInput, setSkillsInput] = useState('');

  const form = useForm({
    resolver: yupResolver(developerValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      avatar: '',
      skills: [],
      social: {
        github: '',
        twitter: '',
        linkedin: '',
        website: '',
      },
    },
  });

  // Populate form when developer data is loaded
  useEffect(() => {
    if (developer) {
      form.reset({
        name: developer.name || '',
        email: developer.email || '',
        bio: developer.bio || '',
        avatar: developer.avatar || '',
        skills: developer.skills || [],
        social: {
          github: developer.social?.github || '',
          twitter: developer.social?.twitter || '',
          linkedin: developer.social?.linkedin || '',
          website: developer.social?.website || '',
        },
      });
      setSkillsInput((developer.skills || []).join(', '));
    }
  }, [developer, form]);

  // Keep form state in sync with skills input
  useEffect(() => {
    form.setValue(
      'skills',
      skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }, [skillsInput, form]);

  // Show validation errors for debugging
  

  // Corrected submit logic: use developer.id for update
  const onSubmit = (values: DeveloperModel) => {
    if (!developer?.id) return;
    updateDeveloper(
      { id: String(developer.id), model: values },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated!",
            description: "Your developer profile was updated successfully.",
            variant: "success",
          });
          if (onSuccess) onSuccess();
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
  };

  const social = form.watch('social') || {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-y-scroll h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name *</Label>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email *</Label>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <Label>Bio</Label>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <Label>Avatar URL</Label>
              <FormControl>
                <Input placeholder="Avatar URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <Label>Skills (comma separated) *</Label>
              <FormControl>
                <Input
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Node.js"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className="border p-3 rounded space-y-2">
          <legend className="font-semibold">Social Links</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="social.github"
              render={({ field }) => (
                <FormItem>
                  <Label>GitHub</Label>
                  <FormControl>
                    <Input placeholder="GitHub URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.twitter"
              render={({ field }) => (
                <FormItem>
                  <Label>Twitter</Label>
                  <FormControl>
                    <Input placeholder="Twitter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.linkedin"
              render={({ field }) => (
                <FormItem>
                  <Label>LinkedIn</Label>
                  <FormControl>
                    <Input placeholder="LinkedIn URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.website"
              render={({ field }) => (
                <FormItem>
                  <Label>Website</Label>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 mt-2">
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <BsTwitterX />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer">
                <CgWebsite />
              </a>
            )}
          </div>
        </fieldset>
        <Button type="submit" disabled={isUpdating} className="w-full mt-2">
          {isUpdating ? 'Updating...' : 'Update Developer'}
        </Button>
      </form>
    </Form>
  );
}
