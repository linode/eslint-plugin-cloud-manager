import { noCustomFontWeight } from './rules/no-custom-fontWeight';
import { deprecateFormik } from './rules/deprecate-formik';
import { noCreateLinode } from './rules/no-createLinode';

export const rules = {
  'no-custom-fontWeight': noCustomFontWeight,
  'deprecate-formik': deprecateFormik,
  'no-createLinode': noCreateLinode
};
