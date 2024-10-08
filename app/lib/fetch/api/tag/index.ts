import { SERVER_PATH } from '@/app/lib/paths';
import { TagRepository } from '@/repositories/tagRepository';
import axios from 'axios';

interface tag {
  id: number;
  name: string;
}

export const tagService = {
  async findByName(name: string = '') {
    const params = new URLSearchParams('');
    params.set('name', name);
    const { data } = await axios.get<tag[]>(
      SERVER_PATH.TAG + '?' + params.toString(),
    );
    return data;
  },
};
