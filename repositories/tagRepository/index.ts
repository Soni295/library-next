import { injectable } from 'inversify';
import prisma from '@/app/lib/db/prisma';
import { SearchFilterByText } from '..';
import { CriteriaTag } from '../criteria/tagCriteria';

@injectable()
export class TagRepository {
  async getById(id: number) {
    return prisma.tag.findUnique({ where: { id } });
  }

  async getByCriteria(criteria: CriteriaTag) {
    return prisma.tag.findMany(criteria.apply()[0]);
  }

  async getByName(name: string) {
    return prisma.tag.findMany({ where: { name: { contains: name } } });
  }

  async create(tag: TagCreate) {
    return prisma.tag.create({ data: { ...tag } });
  }

  async update(tag: Tag) {
    return prisma.tag.update({
      where: { id: tag.id },
      data: {
        name: tag.name,
        categoryId: tag.categoryId,
      },
    });
  }

  async getByFilter({
    page = 1,
    pageSize = 20,
    text = '',
  }: SearchFilterByText) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = {
      OR: [{ name: { contains: text } }],
      AND: { deletedAt: null },
    };

    const data = await prisma.tag.findMany({
      where,
      skip,
      take,
      include: { category: true },
    });

    const totalItems = await prisma.tag.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }

  async deleteById(id: number) {
    return prisma.tag.update({
      where: {
        id,
      },
      data: { deletedAt: new Date() },
    });
  }
}

interface TagCreate {
  name: string;
  categoryId: number;
}

interface Tag {
  id: number;
  name: string;
  categoryId: number;
}
