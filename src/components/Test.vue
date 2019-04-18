<template>
  <div>
    <b-button v-b-modal.modal-prevent>Launch demo modal</b-button>

    <!-- Main UI -->
    <div class="mt-3 mb-3">
      Submitted Names:
      <ul>
        <li v-for="item in items" :key="item._id">{{ item.name }}</li>
      </ul>
    </div>

    <!-- Modal Component -->
    <b-modal
      id="modal-prevent"
      ref="modal"
      title="Submit your name"
      @ok="handleOk"
      @shown="clearItem"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input v-model="item" placeholder="Enter your name"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: '',
        items: []
      }
    },
    methods: {
      clearItem() {
        this.item = ''
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        if (!this.item) {
          alert('Please enter your name')
        } else {
          this.handleSubmit()
        }
      },
      handleSubmit() {
        this.items.push(this.item)
        this.clearItem()
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>