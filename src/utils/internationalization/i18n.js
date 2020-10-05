import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'kin', 'fr'],
  directory: `${__dirname}/../../../locales`,
  defaultLocale: 'en',
  headers: 'Accept-language'
});

export default i18n;
