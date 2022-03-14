const formatSummary = (oldSummary: string) => {
  let toPush = true
  let summary = ''
  for (let c of oldSummary) {
    if (c === '<') toPush = false
    else if (c === '>') toPush = true
    else if (toPush) summary = summary.concat(c)
  }
  return summary
}

const filterIDs = (favorites: any[]) => {
  return favorites.map(favorite => {
    return favorite.id
  })
}

const orderByName = (list: any) => {
  let newArray = [...list]
  return newArray.sort((a: any, b: any) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
    return 0
  })
}

export { formatSummary, filterIDs, orderByName }
