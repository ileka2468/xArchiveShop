/// <reference types="vite/client" />

type formType = "changeEmail" | "changeName" | "resetPassword";

type conditionalInput = {
  label: string;
  type: string;
  placeholder: string;
  conditionalState: boolean;
};
