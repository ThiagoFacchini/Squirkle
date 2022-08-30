import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface CommandLineStoreType {
  isActive: boolean,
  updateIsActive: (isActive: boolean) => void
}
// --------------------------------------------------------


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_ACTIVE = false
// --------------------------------------------------------

export const useCommandLineStore = create<CommandLineStoreType>((set) => ({
  isActive: DEFAULT_IS_ACTIVE,
  updateIsActive: (isActive) => set((state) => ({ isActive: isActive }))
}))

export default useCommandLineStore
