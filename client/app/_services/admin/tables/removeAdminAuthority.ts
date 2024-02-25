import { getBrowserClient } from "@services/supabase/getBrowserClient";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { ADMIN_ROLES as adminRoles } from "@constants/admin/base";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { Tables } from "@constants/base/database-types";

function getAdminLevelPrecedence(role: typeof adminRoles[number]) {
  return adminRoles.findIndex((adminRole) => adminRole === role)
}

export default async function removeAdminAuthority(targetUser: Tables<'users'>) {
  const supabase = getBrowserClient();
  const authenticatedUser = await getUserStateServer();

  if (!authenticatedUser || authenticatedUser.role === 'user') {
    return { data: null, error: { message: "User unauthorized" } };
  }

  const authenticatedUserAdminLevel = getAdminLevelPrecedence(authenticatedUser.role)
  const targetUserAdminLevel = getAdminLevelPrecedence(targetUser?.role)
  const isTargetUserOfHigherAdminLevel = authenticatedUserAdminLevel >= targetUserAdminLevel

  if (isTargetUserOfHigherAdminLevel) {
    return {
      data: null,
      error: { message: "Operation must be done by someone of higher authority." }
    }
  } else {
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'user' })
      .eq('id', targetUser.id)
      .select()

    return { data, error: processErrorToCrossSideSafe(error) }
  }

}
