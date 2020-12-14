/* eslint-disable */
export function dispatchEventInPayload(response, payload) {
  const { onValidationFailure, onSuccess, onFail } = payload;
  const { status, data } = response;

  if (status === 403) {
    if (onFail) onFail();
  }
  if (status === 400) {
    // transform message
    const errors =
      typeof data.message === 'object'
        ? data.message.reduce((acc, { property, constraints }) => {
            const messages = Object.keys(constraints).map((m) => constraints[m]);
            return {
              ...acc,
              [property]: messages,
            };
          }, {})
        : data.message;

    if (onValidationFailure) onValidationFailure(errors, response);
    if (onFail) onFail(response);
    return;
  }

  if (status === 200 || status === 201) {
    if (onSuccess) return onSuccess(data);
    return;
  }

  if (onFail) onFail(response);
}

// set custom validation message
export function setValidateMessage(form, errors) {
  const initFields = Object.keys(errors).reduce(
    (r, field) => [
      ...r,
      {
        type: 'server',
        name: field,
        message: errors[field] || 'Lỗi lấy từ máy chủ.',
      },
    ],
    [],
  );

  form(initFields);
}

export function createValidationCallback(form) {
  return function _setValidateMessage(errors) {
    setValidateMessage(form, errors);
  };
}
