import { SidebarHeader, SidebarNavDesktop, SidebarNavMobile } from '@/features/account/components/account-sidebar'

export default function AccountSidebar() {
  return (
    <aside className="overflow-x-auto rounded-4xl bg-account-section lg:col-span-1 lg:m-0 lg:overflow-visible">
      <SidebarHeader />
      <SidebarNavDesktop />
      <SidebarNavMobile />
    </aside>
  )
}