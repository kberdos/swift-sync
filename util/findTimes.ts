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
  console.log(availableTimes(reducedItems));
};

export const availableTimes = (events: any) => {
  if (events.length == 0) {
    return [];
  }
  // sort the events by start time
  const sortedEvents = events.sort(
    (a: any, b: any) =>
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
  );
  let latestEndTime = new Date(sortedEvents[0].end.dateTime).toISOString();
  console.log("latestEndTime", latestEndTime);
  let availableTimes = [];
  for (let i = 0; i < sortedEvents.length - 1; i++) {
    console.log(`loop iteration ${i}`);
    const currentEventEnd = new Date(
      Math.max(
        new Date(latestEndTime).getTime(),
        new Date(sortedEvents[i].end.dateTime).getTime()
      )
    ).toISOString();
    const nextEventStart = new Date(
      sortedEvents[i + 1].start.dateTime
    ).toISOString();
    console.log("currentEventEnd", currentEventEnd);
    console.log("nextEventStart", nextEventStart);
    if (new Date(currentEventEnd) < new Date(nextEventStart)) {
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
// function findAvailableTimes(
//   events: Event[],
//   startTime: TimeFrame,
//   endTime: TimeFrame
// ): TimeSlot[] {
//   // Create an array to store available time slots
//   const availableTimes: TimeSlot[] = [];

//   // Convert the start and end time to Date objects
//   const startDate = new Date(startTime.dateTime);
//   const endDate = new Date(endTime.dateTime);

//   // Sort events by start time
//   const sortedEvents = events.sort(
//     (a, b) =>
//       new Date(a.start.dateTime).getTime() -
//       new Date(b.start.dateTime).getTime()
//   );

//   // Check availability before the first event
//   if (startDate < new Date(sortedEvents[0].start.dateTime)) {
//     availableTimes.push({
//       start: startTime.dateTime,
//       end: sortedEvents[0].start.dateTime,
//     });
//   }

//   // Check availability between events
//   for (let i = 0; i < sortedEvents.length - 1; i++) {
//     const currentEventEnd = new Date(sortedEvents[i].end.dateTime);
//     const nextEventStart = new Date(sortedEvents[i + 1].start.dateTime);

//     if (currentEventEnd < nextEventStart) {
//       availableTimes.push({
//         start: currentEventEnd.toISOString(),
//         end: nextEventStart.toISOString(),
//       });
//     }
//   }

//   // Check availability after the last event
//   if (endDate > new Date(sortedEvents[sortedEvents.length - 1].end.dateTime)) {
//     availableTimes.push({
//       start: sortedEvents[sortedEvents.length - 1].end.dateTime,
//       end: endTime.dateTime,
//     });
//   }

//   return availableTimes;
// }

// // Example usage:
// const events: Event[] = [
//   {
//     start: {
//       dateTime: "2024-02-04T14:00:00-05:00",
//       timeZone: "America/Los_Angeles",
//     },
//     end: {
//       dateTime: "2024-02-04T15:00:00-05:00",
//       timeZone: "America/Los_Angeles",
//     },
//     summary: "Event 1",
//   },
//   {
//     start: {
//       dateTime: "2024-02-04T16:30:00-05:00",
//       timeZone: "America/Los_Angeles",
//     },
//     end: {
//       dateTime: "2024-02-04T17:30:00-05:00",
//       timeZone: "America/Los_Angeles",
//     },
//     summary: "Event 2",
//   },
//   // Add more events as needed
// ];

// // const startTime: TimeFrame = { dateTime: '2024-02-04T12:00:00-05:00', timeZone: 'America/Los_Angeles' };
// // const endTime: TimeFrame = { dateTime: '2024-02-04T18:00:00-05:00', timeZone: 'America/Los_Angeles' };

// // const availableTimes: TimeSlot[] = findAvailableTimes(events, startTime, endTime);
// // console.log(availableTimes);
