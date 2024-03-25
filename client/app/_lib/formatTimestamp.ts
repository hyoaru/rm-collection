import dayjs from "dayjs";

export function formatTimestampTable(timestamp: string) {
  const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:MM:ss'
  const formattedTimestamp = dayjs(timestamp).format(TIMESTAMP_FORMAT)
  return formattedTimestamp
}