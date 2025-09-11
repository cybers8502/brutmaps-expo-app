type ArchitectsPicture = {
  url: string;
  name: string;
  alt: string;
};

export type ArchitectsResponse = {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image: ArchitectsPicture;
  sights_count: string;
};
