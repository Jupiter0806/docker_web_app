export interface Reporting {
  access: boolean;
  downloading: boolean;
  uploading: boolean;
}

export interface Permissions {
  editingSiteInfo: boolean;
  reporting: Reporting;
  inputOutputRecording: boolean;
  uploadingPhotos: boolean;
  comments: boolean;
}
