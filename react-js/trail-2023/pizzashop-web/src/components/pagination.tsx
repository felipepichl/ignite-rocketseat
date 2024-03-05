type PaginationProps = {
  pageIndex: number
  totalCount: number
  parPage: number
}

export function Pagination({
  pageIndex,
  totalCount,
  parPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / parPage) || 1

  return <div className="flex items-center justify-between"></div>
}
