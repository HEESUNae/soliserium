import { Suspense } from 'react';
import { MailView } from '../../../features/mail/ui/mail-veiw';

export default function MailPage() {
  return (
    <Suspense>
      <MailView />
    </Suspense>
  );
}
