import LoginForm from '@/components/features/LoginForm';
import config from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Login - ${config.appName}`,
};

export default function Page() {

  return (
    <>
      <LoginForm />
    </>
  );
}


