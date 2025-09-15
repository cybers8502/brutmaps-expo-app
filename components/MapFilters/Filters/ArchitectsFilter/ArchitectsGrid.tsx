import {ArchitectsResponse} from '@/interfaces/Architects.interface';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import COLORS from '@/constants/Colors';

function getCellWidth(columns: number, gap: number, padding: number = 0) {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
}

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
    flexDirection: 'row',
    alignItems: 'center',
    width: getCellWidth(2, 8, 16),
    gap: 8,
    padding: 8,
    backgroundColor: COLORS.backgroundWhite,
    overflow: 'hidden',
  },
  cardImage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: '50%',
    backgroundColor: COLORS.backgroundWhite,
    objectFit: 'cover',
  },
  cardText: {
    fontSize: 13,
    color: COLORS.textPrime,
    overflow: 'hidden',
  },
});
