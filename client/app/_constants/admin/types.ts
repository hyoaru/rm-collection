export type NavigationType = {
  name: string
  pathName: string
  adminRolesPermitted: string[]
}

export type DataTableRowActionType = {
  label: string;
  onClick: (...args: any) => any;
  isDestructive: boolean;
  adminRolesPermitted: string[];
};