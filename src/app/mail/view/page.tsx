import { Suspense } from 'react';
import { MailView } from './mail-veiw';

export default function MailPage() {
  return (
    <Suspense>
      <MailView />
    </Suspense>
  );
}
