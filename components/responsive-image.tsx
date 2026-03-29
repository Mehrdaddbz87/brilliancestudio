import Image from "next/image";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  aspectClassName?: string;
  className?: string;
};

const DEFAULT_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Wraps `next/image` with the project's default responsive sizing and aspect-ratio behavior.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = DEFAULT_SIZES,
  priority = false,
  aspectClassName = "aspect-[4/3]",
  className = "",
}: ResponsiveImageProps) {
  return (
    <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={80}
        sizes={sizes}
        className={`object-cover transition duration-500 ${className}`.trim()}
      />
    </div>
  );
}
