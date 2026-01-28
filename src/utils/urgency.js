export const URGENCY_LEVELS = {
  CRITICAL: { label: "CRITICAL", color: "red", priority: 1 },
  HIGH: { label: "HIGH PRIORITY", color: "purple", priority: 2 },
  URGENT: { label: "URGENT", color: "orange", priority: 3 },
  STANDARD: { label: "NEW REQUEST", color: "blue", priority: 4 },
};

export const getUrgencyLevel = (request) => {
  if (!request?.donationDate && !request?.date) return URGENCY_LEVELS.STANDARD;

  const targetDate = new Date(request.donationDate || request.date);
  const now = new Date();

  // Calculate difference in hours
  const hoursLeft = (targetDate - now) / 36e5;

  const rareTypes = ["O-", "AB-", "B-"];
  const isRare = rareTypes.includes(request.bloodGroup);

  // 1. CRITICAL: < 24 hours left OR < 0 hours (overdue/immediate)
  if (hoursLeft < 24) return URGENCY_LEVELS.CRITICAL;

  // 2. HIGH: Rare blood types (regardless of time, until standard window)
  if (isRare) return URGENCY_LEVELS.HIGH;

  // 3. URGENT: < 72 hours (3 days) left
  if (hoursLeft < 72) return URGENCY_LEVELS.URGENT;

  // 4. STANDARD: Everything else
  return URGENCY_LEVELS.STANDARD;
};
