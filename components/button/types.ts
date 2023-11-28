export interface Button {
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "action"
    | "accent"
    | "danger"
    | "info";
  icon?: React.ReactNode;
}
