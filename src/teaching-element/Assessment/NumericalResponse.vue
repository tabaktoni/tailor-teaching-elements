<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answer-group">
      <li
        v-for="(it, index) in items"
        :key="index"
        class="input-group">
        <div v-if="it.prefix" class="input-group-addon">{{ it.prefix }}</div>
        <input
          v-model.trim="it.answer"
          @input="update"
          :disabled="disabled"
          type="text"
          class="form-control"
          placeholder="Solution...">
        <div v-if="it.suffix" class="input-group-addon">{{ it.suffix }}</div>
      </li>
    </ul>
    <span class="help-block">
      Only numerical input allowed, if decimal number is needed please
      use '.' to separate numbers (e.g. '3.14', '1000' not '1,000').
    </span>
  </div>
</template>

<script>
import zipWith from 'lodash/zipWith';

export default {
  props: {
    disabled: { type: Boolean, default: false },
    prefixes: { type: Array, required: true },
    retake: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) },
    suffixes: { type: Array, required: true }
  },
  data() {
    return { items: [] };
  },
  methods: {
    initializeSubmission(submission) {
      if (!submission) return;
      this.items = this.items.map((item, index) => {
        item.answer = submission[index];
        return item;
      });
    },
    update() {
      const userAnswer = this.items.map(({ answer }) => {
        return answer ? Number(answer) : NaN;
      });
      const isValid = userAnswer.every(it => !isNaN(it));
      this.$emit('validateAnswer', { isValid });
      this.$emit('update', { userAnswer });
    }
  },
  watch: {
    retake(val) {
      if (val) this.items.forEach(it => (it.answer = null));
    },
    submission: 'initializeSubmission'
  },
  created() {
    this.items = zipWith(this.prefixes, this.suffixes,
      (prefix, suffix) => ({ prefix, suffix }));
    this.initializeSubmission(this.submission);
  }
};
</script>

<style lang="scss">
.assessment.numerical-response {
  .answer-group {
    margin-top: 10px;
  }

  ul {
    padding: 0 0 0 10px;
    list-style: none;

    li {
      padding: 5px 0;
    }
  }
}
</style>
