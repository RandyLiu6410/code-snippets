export const EVENT = {
  //USER_SERVICE
  USER_SERVICE_SELECT_OVER: "user-service:user-picker:select-over",
  USER_SERVICE_CLOSE: "user-service:user-picker:close",
  USER_SERVICE_ADD_EMAIL: "user-service:user-picker:add-email",
  USER_SERVICE_REMOVE_EMAIL: "user-service:user-picker:remove-email",
};

export const SPAEventGenerator = (event, uid) => `${event}-${uid}`;
