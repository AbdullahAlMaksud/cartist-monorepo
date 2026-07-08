const BDT_LOCALE = "bn-BD";

export const formatCurrency = (amount: number, locale: string = BDT_LOCALE): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRelativeTime = (isoDate: string, locale: string): string => {
  const rtf = new Intl.RelativeTimeFormat(locale === "bn" ? "bn-BD" : "en-US", {
    numeric: "auto",
  });

  const diffMs = new Date(isoDate).getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60_000);

  const THRESHOLDS: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, "minute"],
    [24 * 60, "hour"],
    [30 * 24 * 60, "day"],
    [12 * 30 * 24 * 60, "month"],
  ];

  for (const [limit, unit] of THRESHOLDS) {
    if (Math.abs(diffMinutes) < limit) {
      const divisor = unit === "minute" ? 1 : unit === "hour" ? 60 : unit === "day" ? 1440 : 43_200;
      return rtf.format(Math.round(diffMinutes / divisor), unit);
    }
  }

  return rtf.format(Math.round(diffMinutes / 525_600), "year");
};
