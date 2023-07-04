export enum ExtensionRuntimeRequestType {
  POPUP_MOUNTED,
  LOG,
}

export interface ExtensionRuntimeRequest {
  type: ExtensionRuntimeRequestType;
  content: any;
}
