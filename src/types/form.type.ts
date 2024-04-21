import { Pagination } from "./page.type";

export interface FormResponse {
    code: number,
    errors: string | null;
    pagination: Pagination | null;
    status: string,
    data: FormData
  }

  export interface FormData {
    enableCaptcha: boolean;
    id: number;
    total: number;
    attributeList: Attribute[]
  }

  export interface Attribute {
    id: number;
    name: string;
    fieldType: string;
    fieldId: string;
    config: string;
    parentId: number | null;
    value: string | null;
    attributeList?: null;
  }
