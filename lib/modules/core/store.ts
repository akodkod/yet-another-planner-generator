import { StoreApi, UseBoundStore } from "zustand"
import { useShallow } from "zustand/react/shallow"
import { BaseModule } from "./base"
import { assert } from "@/lib/utils/code-execution"

export abstract class StoreModule<TStore> extends BaseModule {
  abstract readonly store: UseBoundStore<StoreApi<TStore>>

  public get<T extends keyof TStore>(key: T): TStore[T] {
    return this.store.getState()[key]
  }

  public set(data: Partial<TStore>) {
    this.store.setState(data)
  }

  public useState<T extends keyof TStore>(key: T) {
    return this.store((state) => state[key])
  }

  public useShallow<T extends keyof TStore>(key: T) {
    // oxlint-disable-next-line rules-of-hooks
    return this.store(useShallow((state) => state[key]))
  }

  public useRequired<T extends keyof TStore>(key: T) {
    return this.store((state) => {
      const value = state[key]
      assert(value, `${this.moduleName}.${String(key)} is not set`)

      return value
    })
  }

  public getRequired<T extends keyof TStore>(key: T) {
    const value = this.get(key)
    assert(value, `${this.moduleName}.${String(key)} is not set`)

    return value
  }

  public getStore() {
    return this.store
  }
}
