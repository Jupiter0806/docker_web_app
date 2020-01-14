export interface Collection<Modal, FindOptions, Updates> {
  isExist: (id: string) => Promise<boolean>;
  get: (id: string) => Promise<Modal>;
  set: (user: Modal) => Promise<Modal>;
  find: (options: FindOptions) => Promise<Array<Modal>>;
  update: (id: string, updates: Updates) => Promise<Modal>;
}
