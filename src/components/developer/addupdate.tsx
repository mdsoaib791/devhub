'use client'
import { DeveloperDto } from '@/dtos/developer.dto';
import { useAddDeveloper, useUpdateDeveloper } from '@/hooks/services-hook/use-developer.service.hook';
import { DeveloperModel } from '@/models/developer.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  defaultValues?: DeveloperDto | null;
  onSuccess?: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string().nullable(),
  avatar: yup.string().url('Must be a valid URL').nullable(),
  skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
  social: yup.object().shape({
    github: yup.string().url('Must be a valid URL').nullable(),
    twitter: yup.string().url('Must be a valid URL').nullable(),
    linkedin: yup.string().url('Must be a valid URL').nullable(),
    website: yup.string().url('Must be a valid URL').nullable(),
  }),
});

export default function DeveloperAddUpdateForm({ defaultValues, onSuccess }: Props) {
  const isEdit = !!defaultValues;
  const { mutate: addDeveloper, isPending: isAdding } = useAddDeveloper();
  const { mutate: updateDeveloper, isPending: isUpdating } = useUpdateDeveloper();

  // For skills input as comma separated string
  const [skillsInput, setSkillsInput] = useState(
    defaultValues?.skills?.join(', ') || ''
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<DeveloperModel>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
      ? {
        name: defaultValues.name || '',
        email: defaultValues.email || '',
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
      reset({
        name: defaultValues.name || '',
        email: defaultValues.email || '',
        bio: defaultValues.bio || '',
        avatar: defaultValues.avatar || '',
        skills: defaultValues.skills || [],
        social: defaultValues.social || {},
      });
      setSkillsInput(defaultValues.skills?.join(', ') || '');
    }
  }, [defaultValues, reset]);

  // Keep form state in sync with skills input
  useEffect(() => {
    setValue(
      'skills',
      skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }, [skillsInput, setValue]);

  const onSubmit = (values: DeveloperModel) => {
    if (isEdit && defaultValues?.id) {
      updateDeveloper(
        { id: defaultValues.id, model: values },
        { onSuccess }
      );
    } else {
      addDeveloper(values, { onSuccess });
    }
  };

  // Avatar preview
  const avatarUrl = watch('avatar') || 'https://i.pravatar.cc/100';

  // Social links preview
  const social = watch('social') || {};

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'Update Developer' : 'Add Developer'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col items-center gap-2">
            <img
              src={avatarUrl}
              alt="Avatar Preview"
              width={80}
              height={80}
              className="rounded-full border border-gray-200 object-cover"
            />
          </div>
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" {...register('name')} />
            <div className="text-red-500 text-xs">{errors.name?.message}</div>
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" {...register('email')} />
            <div className="text-red-500 text-xs">{errors.email?.message}</div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...register('bio')} />
            <div className="text-red-500 text-xs">{errors.bio?.message}</div>
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input id="avatar" {...register('avatar')} />
            <div className="text-red-500 text-xs">{errors.avatar?.message}</div>
          </div>
          <div>
            <Label htmlFor="skills">Skills (comma separated) *</Label>
            <Input
              id="skills"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
            />
            <div className="text-red-500 text-xs">{errors.skills?.message}</div>
          </div>
          <fieldset className="border rounded p-3">
            <legend className="text-sm font-medium">Social Links</legend>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" {...register('social.github')} />
                <div className="text-red-500 text-xs">{errors.social?.github?.message}</div>
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" {...register('social.twitter')} />
                <div className="text-red-500 text-xs">{errors.social?.twitter?.message}</div>
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" {...register('social.linkedin')} />
                <div className="text-red-500 text-xs">{errors.social?.linkedin?.message}</div>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register('social.website')} />
                <div className="text-red-500 text-xs">{errors.social?.website?.message}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/github.svg" alt="GitHub" width={20} height={20} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                </a>
              )}
              {social.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/link.svg" alt="Website" width={20} height={20} />
                </a>
              )}
            </div>
          </fieldset>
          <Button type="submit" disabled={isAdding || isUpdating} className="w-full mt-2">
            {isEdit ? (isUpdating ? 'Updating...' : 'Update Developer') : (isAdding ? 'Adding...' : 'Add Developer')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
