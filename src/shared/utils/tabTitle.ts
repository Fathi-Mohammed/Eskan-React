import { useTranslation } from 'react-i18next';

export const tabTitle = (title: string) => {
  const { t } = useTranslation();
  document.title = t('Eskan') + ' | ' + t(title);
};
