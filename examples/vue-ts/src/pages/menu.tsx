import { injectGlobal } from "@emotion/css"
import * as menu from "@zag-js/menu"
import { normalizeProps, useMachine, useSetup, PropTypes } from "@zag-js/vue"
import { computed, defineComponent, h, Fragment } from "vue"
import { menuStyle } from "../../../../shared/style"
import { StateVisualizer } from "../components/state-visualizer"
import { useId } from "../hooks/use-id"

injectGlobal(menuStyle)

export default defineComponent({
  name: "Menu",
  setup() {
    const [state, send] = useMachine(menu.machine({ onSelect: console.log }))

    const ref = useSetup({ send, id: useId() })

    const apiRef = computed(() => menu.connect<PropTypes>(state.value, send, normalizeProps))

    return () => {
      const api = apiRef.value
      return (
        <>
          <div ref={ref}>
            <button {...api.triggerProps}>
              Actions <span aria-hidden>▾</span>
            </button>

            <div {...api.positionerProps}>
              <ul {...api.contentProps}>
                <li {...api.getItemProps({ id: "edit" })}>Edit</li>
                <li {...api.getItemProps({ id: "duplicate" })}>Duplicate</li>
                <li {...api.getItemProps({ id: "delete" })}>Delete</li>
                <li {...api.getItemProps({ id: "export" })}>Export...</li>
              </ul>
            </div>
          </div>

          <StateVisualizer state={state} />
        </>
      )
    }
  },
})
