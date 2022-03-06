const URL = process.env.REACT_APP_API || '';

export const PATHS = {
  HOME: `${URL}/`,
  DOCS: `${URL}/docs`,
  DOC: `${URL}/docs/`,
  DOCS_BY_TAG: `${URL}/docsTagged/`,
  ADD_DOC: `${URL}/doc`,
};

export const createDocUrl = (id: string) => `${PATHS.DOC}${id}`;
