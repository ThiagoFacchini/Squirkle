import create from 'zustand'

export const tickStore = create((set) => ({
  tick: 0,
  updateTick: (tickCount) => set((state) => ({ tick: tickCount }))
}))
