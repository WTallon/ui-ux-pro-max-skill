import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
  showTopBar?: boolean;
}

export function AppShell({
  children,
  title,
  showSearch = true,
  showTopBar = true,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#080808]">
      {showTopBar && <TopBar title={title} showSearch={showSearch} />}
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
