import { useTranslation } from 'react-i18next';

export const checkKey = (key, data) => {
  const { t } = useTranslation();

  switch (key) {
    case 'has_elevator':
    case 'has_guard':
    case 'has_kitchen':
    case 'has_cooler':
      return data[key] ? t('aqarInfo.yes') : t('aqarInfo.no');

    case 'is_new':
      return data[key] ? t('aqarInfo.new') : t('aqarInfo.old');

    case 'street_size':
    case 'size':
      return data[key] + ' ' + t('aqarInfo.meters');

    case 'meter_price':
      return data[key] + ' ' + t('RAS');

    case 'age':
      return `${data[key]} ${t('aqarInfo.years')}`;

    default:
      return data[key];
  }
};
