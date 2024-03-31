export interface ContentResponse {
    code: number;
    status: string;
    data: Data;
    errors: string;
    pagination: Pagination;
  }
  
  export interface Data {
    id: number;
    name: string;
    slug: string;
    useCategory: boolean;
    type: PageTemplate;
    contentDataList: ContentDataList[];
  }
  
  export interface ContentDataList {
    id: number;
    title: string;
    shortDesc: string;
    categoryName: string;
    status: string;
    lastComment?: string;
    lastEdited?: string;
    contentData: ContentDatum[];
  }
  
  export interface ContentDatum {
    id: number;
    name: string;
    fieldType: string;
    fieldId: string;
    config: null | string;
    parentId: string;
    value: string;
    contentData: string;
  }
  
  export interface PageTemplate {
    id: number;
    fileName: string;
  }
  
  export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
  }
  