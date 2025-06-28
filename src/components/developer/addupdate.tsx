'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DeveloperDto } from '@/dtos/developer.dto';
import { useAddDeveloper, useUpdateDeveloper } from '@/hooks/services-hook/use-developer.service.hook';
import developerValidationSchema from '@/validation-schema/contact-us.validation.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsTwitterX } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

type Props = {
  defaultValues?: DeveloperDto | null;
  onSuccess?: () => void;
};

export default function DeveloperAddUpdateForm({ defaultValues, onSuccess }: Props) {
  const isEdit = !!defaultValues;
  const { mutate: addDeveloper, isPending: isAdding } = useAddDeveloper();
  const { mutate: updateDeveloper, isPending: isUpdating } = useUpdateDeveloper();

  // For skills input as comma separated string
  const [skillsInput, setSkillsInput] = useState(defaultValues?.skills?.join(', ') || '');

  const form = useForm({
    resolver: yupResolver(developerValidationSchema),
    defaultValues: defaultValues
      ? {
        name: defaultValues.name || '',
        // email: defaultValues.email || '',
        bio: defaultValues.bio || '',
        avatar: defaultValues.avatar || '',
        skills: defaultValues.skills || [],
        social: defaultValues.social || {},
      }
      : {
        name: '',
        email: '',
        bio: '',
        avatar: '',
        skills: [],
        social: {},
      },
  });

  // Populate form if editing
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name || '',
        // email: defaultValues.email || '',
        bio: defaultValues.bio || '',
        avatar: defaultValues.avatar || '',
        skills: defaultValues.skills || [],
        social: defaultValues.social || {},
      });
      setSkillsInput(defaultValues.skills?.join(', ') || '');
    }

  }, [defaultValues]);

  // Keep form state in sync with skills input
  useEffect(() => {
    form.setValue(
      'skills',
      skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );

  }, [skillsInput]);

  const onSubmit = (values: any) => {
    if (isEdit && defaultValues?.id) {
      updateDeveloper(
        { id: defaultValues.id, model: values },
        { onSuccess }
      );
    } else {
      addDeveloper(values, { onSuccess });
    }
  };

  const avatarUrl = form.watch('avatar') || 'https://i.pravatar.cc/100';
  const social = form.watch('social') || {};

  return (

    <div className="container mx-auto my-8">
      <div className="flex justify-center">
        <Card className="w-full lg:w-[65%] xl:w-1/2 shadow-lg">
          <CardHeader>
            <CardTitle>{isEdit ? "Update Developer" : "Add Developer"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <Image
                    src={avatarUrl}
                    alt="Avatar Preview"
                    width={80}
                    height={80}
                    className="rounded-full border border-gray-200 object-cover"
                  />
                </div>
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
                          <Input placeholder="Email" {...field} />
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
                {/* Skills as comma separated input */}
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
                <Button type="submit" disabled={isAdding || isUpdating} className="w-full mt-2">
                  {isEdit ? (isUpdating ? 'Updating...' : 'Update Developer') : (isAdding ? 'Adding...' : 'Add Developer')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
