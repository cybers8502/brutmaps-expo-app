import {ActivityIndicator} from 'react-native';
import ObjectsListNotification from '@/components/ObjectsList/ObjectsListNotification';

interface ObjectsListEmptyProps {
  isLoading: boolean;
  isError: boolean;
}

export default function ObjectsListEmpty({isLoading, isError}: ObjectsListEmptyProps) {
  if (isLoading) {
    return <ActivityIndicator size='large' style={{marginTop: 24}} />;
  } else if (isError) {
    return <ObjectsListNotification text={'Something was going wrong. Try again later.'} />;
  } else {
    return <ObjectsListNotification text={'Nothing to show'} />;
  }
}
