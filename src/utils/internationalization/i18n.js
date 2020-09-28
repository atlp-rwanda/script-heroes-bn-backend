import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'kin', 'fr'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en'
});

export default i18n;
