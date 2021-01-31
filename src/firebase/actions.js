import {
  addDays,
  addMonths,
  addWeeks,
  startOfDay,
  startOfMonth,
  startOfWeek,
  isPast,
} from "date-fns"

export const checkPeriods = (doc, firebase) => {
  let newInit = doc.data().nextInit
  let initTask = [...doc.data().tasks]

  if (isPast(doc.data().nextInit.toDate())) {
    if (doc.data().period === "monthly") {
      newInit = startOfMonth(addMonths(new Date(), 1))
    } else if (doc.data().period === "daily") {
      newInit = startOfDay(addDays(new Date(), 1))
    } else if (doc.data().period === "weekly") {
      newInit = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
    }

    initTask = doc.data().tasks.map(({ task }) => ({ task, checked: false }))

    firebase.db
      .collection("checkers")
      .doc(doc.id)
      .update({ tasks: initTask, nextInit: newInit })
  }

  return { id: doc.id, ...doc.data(), nextInit: newInit, tasks: initTask }
}
