// Format relative time (e.g., "2 days from now", "3 hours ago")
export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 0) {
    return diffInDays === 1 ? 'tomorrow' : `in ${diffInDays} days`;
  } else if (diffInDays < 0) {
    return Math.abs(diffInDays) === 1 ? 'yesterday' : `${Math.abs(diffInDays)} days ago`;
  } else if (diffInHours > 0) {
    return `in ${diffInHours} hour${diffInHours === 1 ? '' : 's'}`;
  } else if (diffInHours < 0) {
    return `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) === 1 ? '' : 's'} ago`;
  } else if (diffInMinutes > 0) {
    return `in ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`;
  } else if (diffInMinutes < 0) {
    return `${Math.abs(diffInMinutes)} minute${Math.abs(diffInMinutes) === 1 ? '' : 's'} ago`;
  } else {
    return 'just now';
  }
}