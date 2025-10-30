export default {
  default: {
    import: ['steps/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    publishQuiet: true
  }
};
