export interface BaseProduct {
  id: string
  name: string
  price: number
  brand?: string
  socket?: string
  memoryType?: string
  watts?: number
  type?: string
  speed?: string
  size?: number
  formFactor?: string
  rating?: string
}

export interface CPUProduct extends BaseProduct {
  brand: string
  socket: string
  memoryType: string
  watts: number
}

export interface MotherboardProduct extends BaseProduct {
  socket: string
  memoryType: string
  formFactor: string
}

export interface RAMProduct extends BaseProduct {
  type: string
  speed: string
  size: number
}

export interface GPUProduct extends BaseProduct {
  watts: number
}

export interface StorageProduct extends BaseProduct {
  type: string
}

export interface PSUProduct extends BaseProduct {
  watts: number
  rating: string
}

export interface CaseProduct extends BaseProduct {
  formFactor: string
}

export type Product = CPUProduct | MotherboardProduct | RAMProduct | GPUProduct | StorageProduct | PSUProduct | CaseProduct

export interface BuildState {
  cpu: CPUProduct | null
  motherboard: MotherboardProduct | null
  ram: RAMProduct | null
  gpu: GPUProduct | null
  storage: StorageProduct | null
  psu: PSUProduct | null
  case: CaseProduct | null
}

export interface CategoryInfo {
  key: keyof BuildState
  label: string
  icon: React.ComponentType<{ className?: string }>
}