
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/constants';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <Button variant="whatsapp" asChild className="rounded-full p-4 shadow-lg">
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
          <span className="material-icons">whatsapp</span>
        </a>
      </Button>
      <Button variant="email" asChild className="rounded-full p-4 shadow-lg">
        <a href={CONTACT.email}>
          <span className="material-icons">email</span>
        </a>
      </Button>
    </div>
  );
}
