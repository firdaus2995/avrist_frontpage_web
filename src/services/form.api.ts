import { FormResponse } from '@/types/form.type';
import { httpService } from '@/utils/httpService';

export const getFormBy = async (formId: string) => {
    return await httpService<FormResponse>('form', formId, { 
        method: 'GET',
        }
    );
  };