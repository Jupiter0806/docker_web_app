export interface Collection<Modal, FindOptions, Updates> {
  isExist: (id: string) => boolean;
  get: (id: string) => Modal;
  set: (user: Modal) => Promise<Modal>;
  find: (options: FindOptions) => Array<Modal>;
  update: (id: string, updates: Updates) => Modal;
}
