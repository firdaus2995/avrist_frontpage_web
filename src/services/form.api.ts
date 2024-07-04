import { FormResponse, SendEmailResponse } from '@/types/form.type';
import { httpService, QueryParams } from '@/utils/httpService';

export const getFormBy = async (formId: string) => {
  return await httpService<FormResponse>('form', formId, {
    method: 'GET'
  });
};

export const handleSendEmail = async (query: any) => {
  return await httpService<SendEmailResponse>('default', 'send/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });
};

export const subscribeApi = async (query: QueryParams) => {
  return await httpService('default', 'subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  });
};
