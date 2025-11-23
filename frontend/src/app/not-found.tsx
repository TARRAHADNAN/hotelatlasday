import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-heading font-semibold mb-4">Page non trouvée</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button size="lg">Retour à l&apos;accueil</Button>
        </Link>
      </div>
    </div>
  );
}
