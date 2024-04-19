import { ProviderResponse } from '@/types/provider.type';
import { QueryParams, httpService } from '@/utils/httpService';

export const getProvider = async (query: QueryParams) => {
    return await httpService<ProviderResponse>('provider', '', { 
        method: 'GET',
        headers: {
            Authorization: 'Basic dXNlcjpPTjg1cUp6ZSViNmk6K1tzKkN6RSZVOXVBJTM=',
            'Content-Type': 'application/json'
        },
        queryParams: query
        }
    );
  };
  
  export const handleGetProvider = async (query: QueryParams) => {  
      const data = await getProvider(query);
      return data;
  };