export const EVENT = {
  //FORM_VIEWER
  FORM_VIEWER_ANSWER: "form-service:form-viewer:answer",
};

export const SPAEventGenerator = (event, uid) => `${event}-${uid}`;
