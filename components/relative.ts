export const relative = (postedAtDate: string): string => {
  const now = Date.now()
  const today = new Date()

  const postedAtms = new Date(postedAtDate.replace(/-/g,"/")).getTime()
  const postedAt = new Date(postedAtDate.replace(/-/g,"/"))

  const delta = now - postedAtms
  const deltaDays = delta / (1000 * 60 * 60 * 24) // ミリ秒 -> 日数

  return delta < 1000 * 60 * 3
    ? 'just now'
    : delta < 1000 * 60 * 60
    ? Math.floor(delta / (1000 * 60)).toString() + ' minutes ago'
    : delta < 1000 * 60 * 60 * 24
    ? Math.floor(delta / (1000 * 60 * 60)) === 1
      ? '1 hour ago'
      : Math.floor(delta / (1000 * 60 * 60)).toString() + ' hours ago'
    : today.getFullYear() !== postedAt.getFullYear()
    ? today.getFullYear() - postedAt.getFullYear() === 1
      ? 'last year'
      : Math.floor(today.getFullYear() - postedAt.getFullYear()).toString() +
        ' years ago'
    : today.getMonth() !== postedAt.getMonth()
    ? today.getMonth() - postedAt.getMonth() === 1
      ? 'last month'
      : Math.floor(today.getMonth() - postedAt.getMonth()).toString() +
        ' months ago'
    : Math.floor(deltaDays) === 1
    ? 'yesterday'
    : Math.floor(deltaDays).toString() + ' days ago'
}
