export default function UserAvatar({
  url,
  alt,
}: {
  url?: string;
  alt?: string;
}) {
  return (
    <>
      <img
        className="w-full h-full"
        src={url ?? '/images/profile_default.svg'}
        alt={alt}
      />
    </>
  );
}
