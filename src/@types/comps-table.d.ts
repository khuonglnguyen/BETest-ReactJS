interface BaseCompsRowDto {
  name: string;
  count: number;
  isLeaf: boolean;
  children: any;
  level: number;
}

interface CompsTableRowDto extends BaseCompsRowDto {
  id: number;
  parent?: any;
  parentName?: string;
}

interface CompsColDto {
  id: number;
  name: string;
}