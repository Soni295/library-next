/*
import { Permission, Role, User } from '@prisma/client';
import prisma from '../db/prisma';
// para iniciar el servidor
export async function crearPermissions() {
  const count = await prisma.permission.count()
  if (count > 0) return
  await prisma.permission.createMany({
    data: [
      { resource: "Product", action: "create" },
      { resource: "Product", action: "update" },
      { resource: "Product", action: "read" },
      { resource: "Product", action: "delete" },
    ],
  })
}

export async function crearRoles() {
  const count = await prisma.role.count()
  if (count == 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "admin", description: "persona con todos los permisos",
        },
        { name: "colavorador", description: "persona que puede ver y modificar algunos producto" },
        { name: "view", description: "solo cliente" },
      ],
    })
  }


  const allPermission = await prisma.permission.findMany({
    select: { id: true }
  }).then(permissions => permissions.map(({ id }) => ({ id })))

  await prisma.role.update({
    where: {
      name: "admin",
    },
    data: {
      permissions: {
        connect: allPermission
      }
    }
  })

  /*
  await prisma.role.update({
    where: {
      name: "colavorador",
    },
    data: {
      permissions: { connect: [{ id: 2 }, { id: 3 }] }
    }
  })
*/
