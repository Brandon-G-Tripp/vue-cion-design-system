import dotProp from 'dot-prop'
import Schema from 'async-validator'

/**
 * @mixin
 */
export default {
  inject: {
    $parentForm: {
      default: null
    }
  },
  provide() {
    return {
      $parentInput: this
    }
  },
  props: {
    /**
     * The value of the input. Can be passed via v-model.
     */
    value: {
      type: [String, Object, Number],
      default: null
    },
    /**
     * The model name when used within a form component. Uses dot notation.
     */
    model: {
      type: String,
      default: null
    },
    /**
     * The label of the input.
     */
    label: {
      type: String,
      default: null
    },
    /**
     * The id of the input.
     */
    id: {
      type: String,
      default: null
    },
    /**
     * Whether the input is disabled or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * The async-validator schema used for the input.
     */
    schema: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      innerValue: null,
      error: null
    }
  },
  computed: {
    stateClasses() {
      return {
        'is-disabled': this.disabled,
        'has-error': !!this.error
      }
    }
  },
  watch: {
    value: {
      handler(value) {
        this.innerValue = value
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    input(event) {
      if (this.$parentForm) {
        this.$parentForm.update(this.model, event.target.value)
      } else {
        /**
         * Fires after user input.
         * Receives the value as the only argument.
         *
         * @event input
         */
        this.$emit('input', event.target.value)
        this.validate(event.target.value)
      }
    },
    handleFormUpdate(data, errors) {
      this.innerValue = dotProp.get(data, this.model)
      this.error = errors ? errors[this.model] : null
    },
    validate(value) {
      const validator = new Schema({ input: this.schema })
      // Prevent validator from printing to console
      // eslint-disable-next-line
      const warn = console.warn;
      // eslint-disable-next-line
      console.warn = () => {};
      validator.validate({ input: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = null
        }
        // eslint-disable-next-line
        console.warn = warn;
      })
    }
  },
  created() {
    if (this.$parentForm) {
      this.$parentForm.subscribe(this.handleFormUpdate)
    }
  },
  beforeDestroy() {
    if (this.$parentForm) {
      this.$parentForm.unsubscribe(this.handleFormUpdate)
    }
  }
}
