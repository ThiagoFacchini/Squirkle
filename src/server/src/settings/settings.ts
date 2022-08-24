type SettingsType = {
  socket: SocketType,
  calendar: CalendarType
}

type SocketType = {
  tickInterval: number
}

type CalendarType = {
  dayTickAmount: number
}

const settings: SettingsType = {
  socket: {
    tickInterval: 200
  },
  calendar: {
    dayTickAmount: 1440
  }
}

export default settings