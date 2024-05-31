import { useTranslation } from 'react-i18next';

export const keysMap = (key) => {
  const { t } = useTranslation();
  const keysMap = {
    bathrooms: t('aqarInfo.bathrooms'),
    has_guard: t('aqarInfo.hasGuard'),
    has_elevator: t('aqarInfo.hasElevator'),
    is_new: t('aqarInfo.isNew'),
    street_size: t('aqarInfo.streetSize'),
    has_kitchen: t('aqarInfo.hasKitchen'),
    halls: t('aqarInfo.halls'),
    has_cooler: t('aqarInfo.hasCooler'),
    description: t('aqarInfo.description'),
    age: t('aqarInfo.age'),
    sleep_rooms: t('aqarInfo.sleepRooms'),
    front: t('aqarInfo.front'),
    size: t('aqarInfo.size'),
    level: t('aqarInfo.level'),
    meter_price: t('aqarInfo.meterPrice'),
    type_txt: t('aqarInfo.typeTxt'),
  };

  return keysMap[key];
};
