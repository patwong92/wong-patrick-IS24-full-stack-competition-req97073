import { FullName } from './full-name.type';

export type AddProductForm = {
  productName: string;
  scrumMasterName: FullName;
  developers: FullName[];
  productOwnerName: FullName;
  startDate: string;
  methodology: 'AGILE' | 'WATERFALL';
};
