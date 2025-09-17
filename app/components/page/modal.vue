<script lang="ts" setup>
const [state, toggle] = useToggle()

const elementRef = useTemplateRef<HTMLDivElement>('elementRef')

onClickOutside(elementRef, () => {
  if (state.value) {
    toggle()
  }
})
</script>

<template>
  <slot
    name="button"
    :state="state"
    :toggle="toggle"
  />

  <div
    v-if="state"
    class="fixed top-0 left-0 w-full h-full bg-neutral-900/95 z-10 backdrop-blur-xs"
  >
    <div class="sticky top-0 h-screen">
      <div class="relative h-full">
        <div class="px-[10dvmin] py-[10dvmin] flex justify-center items-center h-full w-full">
          <div
            ref="elementRef"
            class="flex justify-center items-center"
          >
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
