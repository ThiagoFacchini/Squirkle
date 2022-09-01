import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface ConfigsStoreType {
  tickInterval: number,
  updateTickInterval: (interval: number) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_TICK_INTERVAL = -1
const DEFAULT_ARE_CONFIGURATIONS_LOADED = false
// --------------------------------------------------------

export const useConfigsStore = create<ConfigsStoreType>((set) => ({
  tickInterval: DEFAULT_TICK_INTERVAL,
  updateTickInterval: (tickInterval) => set((state) => ({ tickInterval: tickInterval })),
}))

export default useConfigsStore