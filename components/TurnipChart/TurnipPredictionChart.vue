<script>
import { Line, mixins } from 'vue-chartjs'
import Chart from 'chart.js'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    Chart.defaults.global.defaultFontFamily = '"Kosugi Maru"'
    Chart.defaults.global.defaultFontColor = '#827157'
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
</script>
