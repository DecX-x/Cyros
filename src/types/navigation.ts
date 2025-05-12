import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Add: undefined;
  Transactions: undefined;
  Settings: undefined;
};

export type AddExpenseTabParamList = {
  ManualEntry: undefined;
  CameraUpload: undefined;
};

export type AddExpenseScreenProps = BottomTabScreenProps<RootStackParamList, 'Add'>;
export type ManualEntryScreenProps = MaterialTopTabScreenProps<AddExpenseTabParamList, 'ManualEntry'>;
export type CameraUploadScreenProps = MaterialTopTabScreenProps<AddExpenseTabParamList, 'CameraUpload'>;