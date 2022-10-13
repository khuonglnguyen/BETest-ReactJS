interface IClipboard {
  time: string;
  createdAt: string;
  value: string;
}
interface ClipboardState {
  listClipboard: IClipboard[];
}
