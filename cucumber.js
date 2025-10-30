export default {
  default: {
    require: ['steps/**/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    publishQuiet: true
  }
};
