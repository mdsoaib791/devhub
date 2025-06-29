import RegisterForm from '@/components/features/RegisterForm';
import config from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Registeration - ${config.appName}`,
};

export default function Page() {

  return (
    <RegisterForm />
  );
}


