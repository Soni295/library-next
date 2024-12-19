export interface PageSearchBasic {
  page: number;
  pageSize: number;
}

export interface SearchFilterProductStock extends PageSearchBasic {
  text: string;
  tagsIds?: number[];
}

export interface SearchFilterCategory extends PageSearchBasic {
  text?: string;
}
