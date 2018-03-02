import i18n from 'i18n';

i18n.configure({
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
  directory: './locales',
  objectNotation: true,
});

module.exports = i18n;
