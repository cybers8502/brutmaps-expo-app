import {ArchitectsResponse} from '@/interfaces/Architects.interface';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function ArchitectsGrid({
  data,
  onPick,
}: {
  data: ArchitectsResponse[];
  onPick: (a: ArchitectsResponse) => void;
}) {
  return (
    <View style={styles.gridContainer}>
      {data.map((item) => (
        <Pressable key={item.id} style={styles.card} onPress={() => onPick(item)}>
          <Image
            source={{
              uri: item?.image?.url || 'https://via.placeholder.com/100',
            }}
            alt={item?.image?.alt}
            style={styles.cardImage}
            resizeMode='cover'
          />
          <Text style={styles.cardText} numberOfLines={2}>
            {item.full_name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
  },

  card: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  cardImage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: '50%',
    backgroundColor: '#ccc',
    objectFit: 'cover',
  },
  cardText: {
    fontSize: 13,
    color: '#222',
    overflow: 'hidden',
  },
});
