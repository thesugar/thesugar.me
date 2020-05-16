const today = new Date();

export const relative = (absoluteDate: string)=> {
    const absolute = new Date(absoluteDate)
    const delta = today.getDate() - absolute.getDate()
    // TODO: weeks ago, years ago
    return delta > 0 ? delta.toString() + 'days ago' : delta === 0 ? 'today' : ''
}