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
      new Date(latestEndTime) < new Date(nextEventStart) &&
      new Date(nextEventStart).getTime() -
        new Date(currentEventEnd).getTime() >=
        length
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

const myEvents: Event[] = [
  {
    start: {
      dateTime: "2024-02-04T14:00:00-05:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2024-02-04T15:00:00-05:00",
      timeZone: "America/Los_Angeles",
    },
    summary: "Event 1",
  },
  {
    start: {
      dateTime: "2024-02-04T16:30:00-05:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2024-02-04T17:30:00-05:00",
      timeZone: "America/Los_Angeles",
    },
    summary: "Event 2",
  },
  // Add more events as needed
];
const startTime: TimeFrame = {
  dateTime: "2024-02-04T12:00:00-05:00",
  timeZone: "America/Los_Angeles",
};
const endTime: TimeFrame = {
  dateTime: "2024-02-04T18:00:00-05:00",
  timeZone: "America/Los_Angeles",
};

interface Event {
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
}

interface TimeFrame {
  dateTime: string;
  timeZone: string;
}

interface TimeSlot {
  start: string;
  end: string;
}
