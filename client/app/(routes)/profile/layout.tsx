import React from "react";
import { User } from "lucide-react";

// App imports
import ProfileSideNavSectionNavigationGroup from "@components/profile/ProfileSideNavSectionNavigationGroup";
import SelectNavigation from "@components/shared/SelectNavigation";
import { NAVIGATIONS as navigations } from "@constants/profile/base";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-4 mb-8">
        <div className="grid grid-cols-12 gap-2 bg-primary rounded-xl">
          {/* Expanded */}
          <div id="ProfileSideNavExpanded" className="hidden col-span-12 md:block sm:col-span-4 lg:col-span-3">
            <div className="">
                <p className="text-xl justify-center font-bold text-center text-primary-foreground mt-8 flex items-center gap-2">
                  <User size={20} />
                  Profile
                </p>
              <div className="flex flex-col gap-0">
                <ProfileSideNavSectionNavigationGroup navigations={navigations} sectionTitle={"account"} />
              </div>
            </div>
          </div>

          {/* Collapsed */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-background rounded-xl md:px-5 lg:px-10">
            <div id="ProfileSideNavCollapsed" className="mb-4 block md:hidden">
              <div className="grid grid-cols-1 gap-4">
                <SelectNavigation navigations={navigations} label={"Account Settings"} />
              </div>
            </div>

            <div className="mb-4 px-2 py-10 lg:px-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
