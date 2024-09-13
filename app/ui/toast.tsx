import { toast } from 'sonner';
export const toastErr = (msg: string) =>
  toast.error(msg, { className: 'bg-red-300', duration: 3000 });
export const toastSuccess = (msg: string) =>
  toast(msg, { className: 'bg-green-300', duration: 3000 });
