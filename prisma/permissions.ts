export const PERMISSIONS = {
  product: {
    create: "create_product",
    view: "view_product",
    edit: "edit_product",
    delete: "delete_product",
  },
  mark: {
    create: "create_mark",
    view: "view_mark",
    edit: "edit_mark",
    delete: "delete_mark",
  },
} as const

export const perms = Object
  .values(PERMISSIONS)
  .flatMap(Object.values);