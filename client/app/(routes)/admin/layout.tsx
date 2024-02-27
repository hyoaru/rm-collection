import { ReactNode } from "react";
import { Cog, Table, Lock } from "lucide-react";
import Link from "next/link";

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from "@constants/admin/base";
import AdminSideNavSectionNavigationGroup from "@components/admin/shared/AdminSideNavSectionNavigationGroup";
import AdminSelectNavigation from "@components/admin/shared/AdminSelectNavigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const authenticatedUser = await getUserStateServer();
  const navigationOperations = Array.from(Object.values(NAVIGATION_OPERATIONS));
  const navigationTables = Array.from(Object.values(NAVIGATION_TABLES));

  return (
    <>
      <div className="pt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 bg-primary rounded-xl">
          {/* Admin side nav expanded */}
          <div id="AdminSideNavExpanded" className="hidden col-span-12 md:block sm:col-span-4 lg:col-span-3">
            <div className=" ">
              <Link href={'/admin'}>
                <p className="text-xl justify-center font-bold text-center text-primary-foreground mt-8 flex items-center gap-2">
                  <Lock size={20} />
                  Admininistrator
                </p>
              </Link>
              <div className="flex flex-col gap-0 ">
                <AdminSideNavSectionNavigationGroup
                  sectionTitle={"operations"}
                  navigations={navigationOperations}
                  authenticatedUser={authenticatedUser}
                  icon={<Cog size={17} />}
                />
                <AdminSideNavSectionNavigationGroup
                  sectionTitle={"tables"}
                  navigations={navigationTables}
                  authenticatedUser={authenticatedUser}
                  icon={<Table size={17} />}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-background rounded-xl md:px-5 lg:px-10">
            {/* Admin side nav collapsed */}
            <div id="AdminSideNavCollapsed" className="mb-4 block md:hidden">
              <div className="grid grid-cols-2 gap-4">
                <AdminSelectNavigation
                  navigations={navigationOperations}
                  label={"operations"}
                  authenticatedUser={authenticatedUser}
                  icon={<Cog size={17} />}
                />
                <AdminSelectNavigation
                  navigations={navigationTables}
                  label={"tables"}
                  authenticatedUser={authenticatedUser}
                  icon={<Table size={17} />}
                />
              </div>
            </div>
            
            {/* Children */}
            <div className="mb-4 px-2 lg:px-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
