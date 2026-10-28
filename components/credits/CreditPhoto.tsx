import Image from "next/image";
import { getMediaUrl } from "@/utils/mediaHelper";

export default function CreditPhoto({
  src,
  className = "object-contain",
}: {
  src?: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <Image
      src={getMediaUrl(src, "")}
      alt=""
      fill
      unoptimized
      className={className}
    />
  );
}
