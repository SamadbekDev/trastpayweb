import { type ComponentPropsWithoutRef } from "react";
export interface SearchIconProps extends ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

export const SearchIcon = ({
  size = 20,
  fill = "currentColor",
  ...props
}: SearchIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_391_449)">
        <path
          d="M19.53 17.14L15.7 13.31C16.35 12.28 16.73 11.05 16.73 9.74C16.73 6.02 13.72 3 10 3C6.28001 3 3.26001 6.02 3.26001 9.74C3.26001 13.46 6.28001 16.47 10 16.47C11.43 16.47 12.75 16.02 13.84 15.26L17.63 19.05C17.89 19.31 18.24 19.44 18.58 19.44C18.93 19.44 19.27 19.31 19.53 19.05C20.06 18.52 20.06 17.67 19.53 17.14ZM10 14.29C7.48001 14.29 5.44001 12.25 5.44001 9.74C5.44001 7.22 7.48001 5.18 10 5.18C12.51 5.18 14.55 7.22 14.55 9.74C14.55 12.25 12.51 14.29 10 14.29Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_391_449">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
