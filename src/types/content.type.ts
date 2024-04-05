import { ContentDatum, PageTemplate, Pagination } from "./page.type";

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
    contentDataList: ContentData[];
  }
  
  export interface ContentData {
    id: number;
    title: string;
    shortDesc: string;
    categoryName: string;
    status: string;
    lastComment?: string;
    lastEdited?: string;
    contentData: ContentDatum[];
  }
  