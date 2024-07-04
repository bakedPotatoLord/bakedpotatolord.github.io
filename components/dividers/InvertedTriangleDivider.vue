<template>
  <div class="rel">
    <div class="custom-shape-divider-bottom-1720123941">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" class="shape-fill"></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rel {
  position: relative;
  .custom-shape-divider-bottom-1720123941 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: scaleY(1) translateY(-1px);
    margin-block-end:0px;
    svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 100px;
    }
    .shape-fill {
      fill: #39125c;
    }
  }
}
</style>