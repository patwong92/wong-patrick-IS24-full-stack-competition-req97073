export type Product = {
  productId: string;
  productName: string;
  scrumMasterName: string;
  productOwnerName: string;
  developers: string[];
  startDate: string;
  methodology: 'AGILE' | 'WATERFALL';
};
