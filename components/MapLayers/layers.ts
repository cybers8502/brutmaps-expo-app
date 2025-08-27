import type {CircleLayerStyle, SymbolLayerStyle} from '@rnmapbox/maps';

export const clusterLayer = {
  id: 'clusters',
  filter: ['has', 'point_count'] as any,
  style: {
    circleRadius: 15,
    circleColor: '#EAE9E6',
  } as CircleLayerStyle,
};

export const clusterCountLayer = {
  id: 'cluster-count',
  filter: ['has', 'point_count'] as any,
  style: {
    textField: '{point_count_abbreviated}',
    textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    textSize: 12,
  } as SymbolLayerStyle,
};

export const unclutteredPointLayer = {
  id: 'sight-points',
  filter: ['!', ['has', 'point_count']] as any,
  style: {
    circleRadius: 11,
    circleColor: [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#C61212',
      ['boolean', ['feature-state', 'isActive'], false],
      '#C61212',
      [
        'match',
        ['get', 'category'],
        'favorite',
        '#FFD700',
        'want_to_go',
        '#1E90FF',
        'visited',
        '#32CD32',
        '#454545',
      ],
    ] as any,
    circleStrokeWidth: 5,
    circleStrokeColor: '#D9D9D9',
  } as CircleLayerStyle,
};

export type ClusterLayer = typeof clusterLayer;
export type ClusterCountLayer = typeof clusterCountLayer;
export type UnclutteredPointLayer = typeof unclutteredPointLayer;
