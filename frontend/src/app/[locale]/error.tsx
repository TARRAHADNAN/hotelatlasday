'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-neutral-600 mb-8">
          Nous sommes désolés, une erreur inattendue s&apos;est produite.
        </p>
        <Button onClick={() => reset()} size="lg">
          Réessayer
        </Button>
      </div>
    </div>
  );
}
