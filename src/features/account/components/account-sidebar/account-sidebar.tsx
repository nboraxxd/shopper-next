import { SidebarHeader, SidebarNavDesktop, SidebarNavMobile } from '@/features/account/components/account-sidebar'

export default function AccountSidebar() {
  return (
    <>
      <SidebarNavMobile />
      <aside className="sticky top-[calc(var(--header-height)+2rem)] col-span-1 h-fit rounded-4xl bg-account-section shadow-section">
        <SidebarHeader />
        <SidebarNavDesktop />
      </aside>
    </>
  )
}
