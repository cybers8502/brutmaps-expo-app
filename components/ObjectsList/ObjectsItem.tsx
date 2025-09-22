import {Alert, Dimensions, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {PhotoPost} from '@/hooks/useFetchObjectsGallery';
import PictureCard from '@/components/shared/PictureCard';

interface ObjectsItemProps {
  item: PhotoPost;
}

function getCellWidth(columns: number, gap: number, padding: number = 0) {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
}

export default function ObjectsItem({item}: ObjectsItemProps) {
  const onPress = async (item: PhotoPost) => {};

  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.85} style={styles.card}>
      <PictureCard
        uri={item.preview_image_url}
        figcaption={item.author.figcaption}
        size={getCellWidth(3, 0, 0)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {},
});
