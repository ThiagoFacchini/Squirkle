type SettingsType = {
  socket: SocketType,
  calendar: CalendarType,
  camera: CameraType,
  player: PlayerType
}

type SocketType = {
  tickInterval: number
}

type CalendarType = {
  dayTickAmount: number
}

type CameraType = {
  offsetZ: number,
  offsetY: number
}

type PlayerType = {
  walkSpeed: number,
  runSpeed: number,
  rotateSpeed: number
}



const settings: SettingsType = {
  socket: {
    tickInterval: 200
  },
  calendar: {
    dayTickAmount: 1440
  },
  camera: {
    offsetZ: 5,
    offsetY: 3
  },
  player: {
    walkSpeed: 1000,
    runSpeed: 333,
    rotateSpeed: 200
  }
}

export default settings