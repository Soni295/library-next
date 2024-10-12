import { useEffect, useState } from 'react';
import { MarksForSelect } from '@/repositories/markRepository';
import { markService } from '@/app/lib/fetch/api/mark';

export function useAllMarks() {
  const [marks, setMarks] = useState<MarksForSelect>([]);

  useEffect(() => {
    async function a() {
      const data = await markService.findAll();
      setMarks(data);
    }
    a();
  }, []);

  return [marks];
}
