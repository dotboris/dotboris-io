import { cn } from "../classnames";

export function PublishDate({
  className,
  date,
}: {
  className?: string;
  date: Date;
}) {
  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    // Since we only care about the date here, we need to be in UTC to avoid
    // timezones shifting us a day back.
    timeZone: "utc",
  }).format(date);
  return (
    <p className={cn(className, "text-sm italic")}>
      Published on <time dateTime={date.toISOString()}>{formattedDate}</time>
    </p>
  );
}
