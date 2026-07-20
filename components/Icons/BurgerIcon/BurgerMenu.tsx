
import { type ComponentPropsWithoutRef } from "react";
export interface BurgerMenuIconProps extends ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

export const BurgerMenu = ({ size = 20, fill = "currentColor", ...props }: BurgerMenuIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4169 4.58325H4.5835C3.89319 4.58325 3.3335 5.14294 3.3335 5.83325C3.3335 6.52356 3.89319 7.08325 4.5835 7.08325H15.4169C16.1072 7.08325 16.6669 6.52356 16.6669 5.83325C16.6669 5.14294 16.1072 4.58325 15.4169 4.58325ZM4.5835 8.75H15.4169C16.1072 8.75 16.6669 9.30957 16.6669 10C16.6669 10.6903 16.1072 11.25 15.4169 11.25H4.5835C3.89319 11.25 3.3335 10.6903 3.3335 10C3.3335 9.30957 3.89319 8.75 4.5835 8.75ZM4.5835 12.9166H15.4169C16.1072 12.9166 16.6669 13.4762 16.6669 14.1666C16.6669 14.8569 16.1072 15.4166 15.4169 15.4166H4.5835C3.89319 15.4166 3.3335 14.8569 3.3335 14.1666C3.3335 13.4762 3.89319 12.9166 4.5835 12.9166Z"
        fill={fill}
      />
    </svg>
  );
};
