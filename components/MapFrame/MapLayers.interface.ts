import type {Feature, FeatureCollection, Point} from 'geojson';

interface FeatureProperty {
  id: number;
  slug: string;
  title: string;
  address: string;
  year: number;
  image: FeaturePropertyImage;
}

interface FeaturePropertyImage {
  url: string;
  alt: string;
  title: string;
}

export type GeoJSONFeature = Feature<Point, FeatureProperty>;

export type IMapLayers = FeatureCollection<Point, FeatureProperty>;
