import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {PhotoPost} from '@/components/ObjectsList/hooks/useFetchObjectsGallery';
import PictureCard from '@/components/shared/PictureCard';
import {router} from 'expo-router';

interface ObjectsItemProps {
  item: PhotoPost;
}

function getCellWidth(columns: number, gap: number, padding: number = 0) {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
}

export default function ObjectsListItem({item}: ObjectsItemProps) {
  const onPress = async (item: PhotoPost) => {
    router.push(`/objects/${item.post_id}`);
  };

  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.85} style={styles.card}>
      <PictureCard
        uri={item.preview_image_url}
        figcaption={item.author.figcaption}
        width={getCellWidth(3, 0, 0)}
        height={getCellWidth(3, 0, 0) * 1.6}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {},
});
