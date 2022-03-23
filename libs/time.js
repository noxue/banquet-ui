let time1 = []
for (let i = 0; i < 24; i++) {
  time1.push({
    value: i <= 9 ? '0' + i : i,
    label: i <= 9 ? '0' + i : i
  })
}

let time2 = []
for (let i = 0; i < 60; i++) {
  time2.push({
    value: i <= 9 ? '0' + i : i,
    label: i <= 9 ? '0' + i : i
  })
}

export default [
  time1,
  time2
]
