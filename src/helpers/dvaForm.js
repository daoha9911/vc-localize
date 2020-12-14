export const handleFormResultNotSuccess = (response, { onValidation, onFailure }) => {
  if (response?.message?.validations && onValidation) {
    onValidation(response?.message?.validations);
  }
  if (onFailure) {
    onFailure(response?.message);
  }
};

export const manifestValidationErr = (form) => (validations) => {
  const fieldSts = Object.keys(validations).reduce(
    (acc, vK) => [...acc, { name: vK, errors: Object.values(validations[vK]) }],
    [],
  );
  form.setFields(fieldSts);
};
