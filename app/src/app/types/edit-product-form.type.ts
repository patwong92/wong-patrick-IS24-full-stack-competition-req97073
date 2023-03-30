import { FullName } from './full-name.type';

export type EditProductForm = {
  productName: string;
  scrumMasterName: FullName;
  developers: FullName[];
  productOwnerName: FullName;
  methodology: 'AGILE' | 'WATERFALL';
};
