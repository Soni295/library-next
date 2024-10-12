import axios from 'axios';
import { SERVER_PATH } from '@/app/lib/paths';
import { MarksForSelect } from '@/repositories/markRepository';

export const markService = {
  async findAll() {
    const data = await axios.get<MarksForSelect>(SERVER_PATH.MARKAll);
    return data.data;
  },
};
