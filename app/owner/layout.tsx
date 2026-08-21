import { OwnerDataProvider } from "./_components/OwnerDataProvider";
import { OwnerToastProvider } from "./_components/OwnerToastProvider";

export default function OwnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <OwnerToastProvider><OwnerDataProvider>{children}</OwnerDataProvider></OwnerToastProvider>;
}
