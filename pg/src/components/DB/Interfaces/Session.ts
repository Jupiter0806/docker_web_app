export interface Session {
  id: string;
  startTimestamp: number;
  startTimeString: string;
  endTimestamp?: number;
  endTimeString?: string;
  expiryTimestamp?: number;
  expiryTimeString?: string;

  accessToken: string;

  sourceDeviceID?: string;
  sourceDeviceType?: string;

  userId: string;

  isActive: boolean;

  // only useful when login via mobile
  mobileNumber?: string;
  verifyDigitalNumber?: string; // used to verify mobile number
  isVerified?: boolean; // whether has verified this digital number
}
