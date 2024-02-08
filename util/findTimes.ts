export const findTimes = (events: any) => {
  const items = events.items;
  // ignore all all day events
  const filteredItems = items.filter((item: any) => {
    return (
      item.end.dateTime &&
      item.start.dateTime.slice(11, 19) != item.end.dateTime.slice(11, 19)
    );
  });
  const reducedItems = filteredItems.map((item: any) => {
    return {
      start: item.start,
      end: item.end,
      summary: item.summary,
    };
  });
  console.log("reduced items", reducedItems);
  //   console.log("available times", availableTimes(reducedItems));
  return reducedItems;
};

export const availableTimes = (
  events: any,
  startDate: any,
  endDate: any,
  length: number
) => {
  if (events.length == 0) {
    return [];
  }
  const filteredEvents = events.filter((event: any) => {
    // only keep events whose end time is before the start of the day after end date
    const dayAfterEndDate = new Date(endDate);
    dayAfterEndDate.setDate(dayAfterEndDate.getDate() + 1);
    return new Date(event.end.dateTime) < dayAfterEndDate;
  });
  // sort the events by start time
  const sortedEvents = filteredEvents.sort(
    (a: any, b: any) =>
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
  );

  sortedEvents.unshift({
    start: { dateTime: startDate },
    end: { dateTime: startDate },
    summary: "PLACEHOLDER DATE START",
  });
  sortedEvents.push({
    start: { dateTime: endDate },
    end: { dateTime: endDate },
    summary: "PLACEHOLDER DATE END",
  });

  let latestEndTime = new Date(sortedEvents[0].end.dateTime).toISOString();
  console.log("latestEndTime", latestEndTime);
  let availableTimes = [];
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    console.log(`loop iteration ${i}`);
    const currentEventEnd = new Date(
      sortedEvents[i].end.dateTime
    ).toISOString();
    const nextEventStart = new Date(
      sortedEvents[i + 1].start.dateTime
    ).toISOString();
    console.log("currentEventEnd", currentEventEnd);
    console.log("nextEventStart", nextEventStart);
    if (
      new Date(latestEndTime).getTime() < new Date(nextEventStart).getTime() &&
      new Date(nextEventStart).getTime() - new Date(latestEndTime).getTime() <=
        length * 60000
    ) {
      availableTimes.push({
        start: currentEventEnd,
        end: nextEventStart,
      });
    }
    latestEndTime = new Date(
      Math.max(
        new Date(latestEndTime).getTime(),
        new Date(sortedEvents[i].end.dateTime).getTime()
      )
    ).toISOString();
  }
  return availableTimes;
};
