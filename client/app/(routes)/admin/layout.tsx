import { ReactNode } from "react";

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
      <div className="mt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 sm:gap-8">
          {/* Admin side nav expanded */}
          <div id="AdminSideNavExpanded" className="hidden col-span-12 sm:block sm:col-span-4 lg:col-span-3">
            <div className="sticky top-[4.8rem] overflow-y-auto h-[80svh]">
              <div className="flex flex-col gap-0 sm:gap-4 ">
                <AdminSideNavSectionNavigationGroup
                  sectionTitle={"operations"}
                  navigations={navigationOperations}
                  authenticatedUser={authenticatedUser}
                />
                <AdminSideNavSectionNavigationGroup
                  sectionTitle={"tables"}
                  navigations={navigationTables}
                  authenticatedUser={authenticatedUser}
                />

                <div className="h-[5rem]"></div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-8 lg:col-span-9">
            {/* Admin side nav collapsed */}
            <div id="AdminSideNavCollapsed" className="mb-4 block sm:hidden">
              <div className="grid grid-cols-2 gap-4">
                <AdminSelectNavigation
                  navigations={navigationOperations}
                  label={"operations"}
                  authenticatedUser={authenticatedUser}
                />
                <AdminSelectNavigation
                  navigations={navigationTables}
                  label={"tables"}
                  authenticatedUser={authenticatedUser}
                />
              </div>
            </div>
            
            {/* Children */}
            <div className="mb-4 rounded-lg border border-x-0 py-5 px-2 lg:px-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
