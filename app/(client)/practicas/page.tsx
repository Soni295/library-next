import {
  FilterByNotDeleted,
  CriteriaTag,
  FilterByName,
} from '@/repositories/criteria/tagCriteria';
import { TagRepository } from '@/repositories/tagRepository';

export default async function PageP() {
  const criteria = new CriteriaTag([
    new FilterByName(''),
    new FilterByNotDeleted(),
  ]);
  console.log(JSON.stringify(criteria.apply(), null, 2));
  const example = new TagRepository();
  const data = await example.getByCriteria(criteria);
  console.log(data);
  return <div>Pruevas</div>;
}
