import { StoreApi, UseBoundStore } from "zustand"
import { useShallow } from "zustand/react/shallow"
import { BaseModule } from "./base"
import { assert } from "@/lib/utils/code-execution"
import { useRef } from "react"
import isDeepEqual from "fast-deep-equal/es6"

export abstract class StoreModule<TStore> extends BaseModule {
  abstract readonly store: UseBoundStore<StoreApi<TStore>>

  get<T extends keyof TStore>(key: T): TStore[T] {
    return this.store.getState()[key]
  }

  set(data: Partial<TStore>) {
    this.store.setState(data)
  }

  use<T extends keyof TStore>(key: T) {
    return this.store((state) => state[key])
  }

  useShallow<T extends keyof TStore>(key: T) {
    return this.store(useShallow((state) => state[key]))
  }

  useDeepShallow<U>(selector: (state: TStore) => U) {
    const prev = useRef<U>(undefined)

    return this.store((state) => {
      const next = selector(state)

      return isDeepEqual(prev.current, next)
        ? (prev.current as U)
        : (prev.current = next)
    })
  }

  useRequired<T extends keyof TStore>(key: T) {
    return this.store((state) => {
      const value = state[key]
      assert(value, `${this.moduleName}.${String(key)} is not set`)

      return value
    })
  }

  getRequired<T extends keyof TStore>(key: T) {
    const value = this.get(key)
    assert(value, `${this.moduleName}.${String(key)} is not set`)

    return value
  }

  getStore() {
    return this.store
  }
}
