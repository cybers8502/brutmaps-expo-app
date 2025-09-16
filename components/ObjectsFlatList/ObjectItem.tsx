import {Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {PhotoPost} from '@/hooks/useFetchObjectsGallery';
import PictureInfo from '@/components/shared/PictureInfo';

interface ObjectsItemProps {
  item: PhotoPost;
}

export default function ObjectsItem({item}: ObjectsItemProps) {
  const onPress = async (item: PhotoPost) => {};

  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.85} style={styles.card}>
      <PictureInfo uri={item.preview_image_url} figcaption={item.author.figcaption} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});
