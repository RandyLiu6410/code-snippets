import { IframeResponse } from "../iframe-response";
import { IFormAnswerItem } from ".";

export interface AnswersChangeRes extends IframeResponse {
  type: "form-iframe-answers-change";
  data: IFormAnswerItem[];
}

export interface ForceCannotSubmitRes extends IframeResponse {
  type: "form-iframe-force-cannot-submit";
  data: boolean;
}

export interface SubmitRes extends IframeResponse {
  type: "form-iframe-submit";
  data: string;
}

export type FormIframeResponse =
  | AnswersChangeRes
  | ForceCannotSubmitRes
  | SubmitRes;
