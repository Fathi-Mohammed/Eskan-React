export type aqars = {
  id: number;
  is_liked: boolean;
  title: string;
  for: string;
  for_txt: string;
  price: number;
  location: {
    address: string;
  };
  image: string;
};

type purpose = {
  label: string;
  value: string;
};

type Ifor = {
  label: string;
  value: string;
};

type type = {
  label: string;
  value: string;
};

type categories = {
  id: number;
  value: number;
  label: string;
};

export type cities = {
  value: number;
  label: string;
};

export type areas = {
  id: number;
  value: string;
  cities: cities[];
};

export type filterData = {
  purpose: purpose[];
  for: Ifor[];
  type: type[];
  categories: categories[];
  areas: areas[];
};

export type RealEstatesProps = {
  data: aqars[];
  filterData: filterData;
};
