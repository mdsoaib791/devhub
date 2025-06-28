'use client'
import { DeveloperDto } from '@/dtos/developer.dto';
import { useAddDeveloper, useUpdateDeveloper } from '@/hooks/services-hook/use-developer.service.hook';
import { DeveloperModel } from '@/models/developer.model';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
        { id: Number(defaultValues.id), model: values },
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <img
          src={avatarUrl}
          alt="Avatar Preview"
          width={80}
          height={80}
          style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee' }}
        />
      </div>
      <div>
        <label>Name *</label>
        <input {...register('name')} />
        <div style={{ color: 'red' }}>{errors.name?.message}</div>
      </div>
      <div>
        <label>Email *</label>
        <input {...register('email')} />
        <div style={{ color: 'red' }}>{errors.email?.message}</div>
      </div>
      <div>
        <label>Bio</label>
        <textarea {...register('bio')} />
        <div style={{ color: 'red' }}>{errors.bio?.message}</div>
      </div>
      <div>
        <label>Avatar URL</label>
        <input {...register('avatar')} />
        <div style={{ color: 'red' }}>{errors.avatar?.message}</div>
      </div>
      <div>
        <label>Skills (comma separated) *</label>
        <input
          value={skillsInput}
          onChange={e => setSkillsInput(e.target.value)}
        />
        <div style={{ color: 'red' }}>{errors.skills?.message}</div>
      </div>
      <fieldset style={{ marginTop: 12 }}>
        <legend>Social Links</legend>
        <div>
          <label>GitHub</label>
          <input {...register('social.github')} />
          <div style={{ color: 'red' }}>{errors.social?.github?.message}</div>
        </div>
        <div>
          <label>Twitter</label>
          <input {...register('social.twitter')} />
          <div style={{ color: 'red' }}>{errors.social?.twitter?.message}</div>
        </div>
        <div>
          <label>LinkedIn</label>
          <input {...register('social.linkedin')} />
          <div style={{ color: 'red' }}>{errors.social?.linkedin?.message}</div>
        </div>
        <div>
          <label>Website</label>
          <input {...register('social.website')} />
          <div style={{ color: 'red' }}>{errors.social?.website?.message}</div>
        </div>
        <div style={{ marginTop: 8 }}>
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              <img src="/icons/github.svg" alt="GitHub" width={20} height={20} />
            </a>
          )}
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              <img src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </a>
          )}
          {social.website && (
            <a href={social.website} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>
              <img src="/icons/link.svg" alt="Website" width={20} height={20} />
            </a>
          )}
        </div>
      </fieldset>
      <button type="submit" disabled={isAdding || isUpdating} style={{ marginTop: 16 }}>
        {isEdit ? (isUpdating ? 'Updating...' : 'Update Developer') : (isAdding ? 'Adding...' : 'Add Developer')}
      </button>
    </form>
  );
}
