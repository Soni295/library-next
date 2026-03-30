import { ProductCreateInputSchema } from "@/app/lib/definitions/product";
import { PrismaClient } from "@prisma/client";
import { PERMISSIONS, perms } from "./permissions";

const prisma = new PrismaClient();

async function main() {

  const employeePermissions = [
    PERMISSIONS.product.view,
    PERMISSIONS.mark.view,
  ]

  const permissions = perms

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: "employee" },
    update: {},
    create: { name: "employee" },
  });

  const viewerRole = await prisma.role.upsert({
    where: { name: "viewer" },
    update: {},
    create: { name: "viewer" },
  });

  const allPermissions = await prisma.permission.findMany();

  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });

    if (employeePermissions.includes(perm.name)) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: employeeRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: employeeRole.id,
          permissionId: perm.id,
        },
      });
    }
  }
}

main()
  .then(() => console.log("Seed OK"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());